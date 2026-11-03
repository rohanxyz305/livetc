<?php
// Shared helpers for hosting customer accounts + Razorpay payments.
// Secrets are NEVER committed to git: hosting-config.php is generated during
// GitHub Actions deploy from repository secrets.

header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store");

error_reporting(0);
ini_set('display_errors', 0);

function json_fail($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $message]);
    exit();
}

function json_ok($data = []) {
    echo json_encode(array_merge(["status" => "success"], $data));
    exit();
}

function require_method($method) {
    if ($_SERVER['REQUEST_METHOD'] !== $method) json_fail("Method not allowed.", 405);
}

// JSON body only. Requiring the JSON content type also blocks cross-site form posts (CSRF).
function json_input() {
    $type = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($type, 'application/json') !== 0) json_fail("Invalid request.", 415);
    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data)) json_fail("Invalid request.");
    return $data;
}

$configFile = __DIR__ . '/hosting-config.php';
if (!file_exists($configFile)) json_fail("Service is not configured yet.", 500);
$CFG = require $configFile;

// ---------- Session (customer login) ----------
session_name('LTC_CUSTOMER');
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function current_customer_id() {
    return isset($_SESSION['customer_id']) ? (int) $_SESSION['customer_id'] : 0;
}

function require_login() {
    $id = current_customer_id();
    if (!$id) json_fail("Please sign in to continue.", 401);
    return $id;
}

// ---------- Database ----------
function db() {
    static $pdo = null;
    global $CFG;
    if ($pdo) return $pdo;
    if (empty($CFG['db_name']) || empty($CFG['db_user'])) json_fail("Service is not configured yet.", 500);
    try {
        $pdo = new PDO(
            "mysql:host=" . ($CFG['db_host'] ?: 'localhost') . ";dbname=" . $CFG['db_name'] . ";charset=utf8mb4",
            $CFG['db_user'],
            $CFG['db_pass'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    } catch (Exception $e) {
        json_fail("Service temporarily unavailable.", 500);
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS customers (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(190) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS hosting_orders (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        customer_id INT UNSIGNED NOT NULL,
        plan VARCHAR(50) NOT NULL,
        amount INT UNSIGNED NOT NULL,
        domain VARCHAR(150) NOT NULL DEFAULT '',
        razorpay_order_id VARCHAR(64) NOT NULL UNIQUE,
        razorpay_payment_id VARCHAR(64) NULL,
        status ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        paid_at DATETIME NULL,
        expires_at DATETIME NULL,
        INDEX (customer_id),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    return $pdo;
}

function public_customer($row) {
    return ["id" => (int) $row['id'], "name" => $row['name'], "email" => $row['email'], "phone" => $row['phone']];
}

// ---------- Plans: server-side source of truth for prices (INR). Never trust the browser. ----------
$PLANS = [
    "starter"  => ["name" => "Starter",  "price" => 1399],
    "business" => ["name" => "Business", "price" => 1799],
    "pro"      => ["name" => "Pro",      "price" => 2199],
    "ultimate" => ["name" => "Ultimate", "price" => 2599],
];

// ---------- Razorpay ----------
function rzp_api($method, $path, $body = null) {
    global $CFG;
    if (empty($CFG['rzp_key_id']) || empty($CFG['rzp_key_secret'])) json_fail("Payment gateway is not configured yet.", 500);
    $ch = curl_init("https://api.razorpay.com/v1" . $path);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERPWD => $CFG['rzp_key_id'] . ":" . $CFG['rzp_key_secret'],
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    ]);
    if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return [$code, json_decode($res, true)];
}

// Marks an order paid (idempotent) and notifies the team. Returns true if it changed state now.
function mark_order_paid($orderId, $paymentId) {
    global $CFG;
    $pdo = db();
    $stmt = $pdo->prepare("UPDATE hosting_orders
        SET status = 'paid', razorpay_payment_id = ?, paid_at = NOW(), expires_at = DATE_ADD(NOW(), INTERVAL 1 YEAR)
        WHERE razorpay_order_id = ? AND status <> 'paid'");
    $stmt->execute([$paymentId, $orderId]);
    if ($stmt->rowCount() === 0) return false;

    if (!empty($CFG['notify_email'])) {
        $q = $pdo->prepare("SELECT o.*, c.name, c.email, c.phone FROM hosting_orders o
            JOIN customers c ON c.id = o.customer_id WHERE o.razorpay_order_id = ?");
        $q->execute([$orderId]);
        $o = $q->fetch();
        if ($o) {
            $body  = "A new hosting payment was received and verified.\n\n";
            $body .= "Plan: {$o['plan']}\nAmount: INR {$o['amount']}\nDomain: " . ($o['domain'] ?: '-') . "\n\n";
            $body .= "Customer: {$o['name']}\nEmail: {$o['email']}\nPhone: {$o['phone']}\n\n";
            $body .= "Order ID: {$orderId}\nPayment ID: {$paymentId}\n";
            $headers = "From: Liveteachcreate <no-reply@liveteachcreate.com>\r\nReply-To: {$o['email']}\r\n";
            @mail($CFG['notify_email'], "New Web Hosting order: {$o['plan']} - {$paymentId}", $body, $headers);
        }
    }
    return true;
}
