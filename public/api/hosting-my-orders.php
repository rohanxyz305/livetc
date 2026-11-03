<?php
require __DIR__ . '/hosting-common.php';
require_method('GET');

$customerId = require_login();
$pdo = db();

// Self-heal: if a customer paid but closed the browser before verification ran,
// ask Razorpay whether recent pending orders were actually paid.
$pending = $pdo->prepare("SELECT razorpay_order_id FROM hosting_orders
    WHERE customer_id = ? AND status = 'pending' AND created_at > DATE_SUB(NOW(), INTERVAL 3 DAY) LIMIT 5");
$pending->execute([$customerId]);
foreach ($pending->fetchAll() as $p) {
    [$code, $payments] = rzp_api("GET", "/orders/" . urlencode($p['razorpay_order_id']) . "/payments");
    if ($code !== 200 || empty($payments['items'])) continue;
    foreach ($payments['items'] as $pay) {
        if ($pay['status'] === 'captured') {
            mark_order_paid($p['razorpay_order_id'], $pay['id']);
            break;
        }
    }
}

$stmt = $pdo->prepare("SELECT id, plan, amount, domain, status, razorpay_order_id, razorpay_payment_id,
        created_at, paid_at, expires_at
    FROM hosting_orders WHERE customer_id = ? AND status = 'paid' ORDER BY created_at DESC");
$stmt->execute([$customerId]);

json_ok(["orders" => $stmt->fetchAll()]);
