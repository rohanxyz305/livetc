<?php
// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error logging suppression to return clean JSON
error_reporting(0);
ini_set('display_errors', 0);

// Get POST JSON data
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData || empty($inputData['to_email'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Recipient email is required."
    ]);
    exit();
}

$senderEmail = !empty($inputData['sender_email']) ? filter_var($inputData['sender_email'], FILTER_SANITIZE_EMAIL) : "connectliveteachcreate@gmail.com";
$senderName = !empty($inputData['sender_name']) ? htmlspecialchars($inputData['sender_name']) : "Liveteachcreate";
$toEmail = filter_var($inputData['to_email'], FILTER_SANITIZE_EMAIL);
$subject = !empty($inputData['subject']) ? htmlspecialchars($inputData['subject']) : "Update regarding your e-commerce seller account";
$htmlContent = !empty($inputData['html_content']) ? $inputData['html_content'] : "<p>Hello from Liveteachcreate!</p>";

$smtpUser = !empty($inputData['smtp_user']) ? $inputData['smtp_user'] : "connectliveteachcreate@gmail.com";
$smtpPass = !empty($inputData['smtp_pass']) ? trim($inputData['smtp_pass']) : "";
$smtpPass = str_replace(' ', '', $smtpPass);

// Function for Socket-based SMTP Sending via SSL / TLS
function sendViaGmailSmtp($user, $pass, $fromName, $toEmail, $subject, $body) {
    $host = 'ssl://smtp.gmail.com';
    $port = 465;
    $timeout = 10;

    $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
    
    if (!$socket) {
        $host = 'smtp.gmail.com';
        $port = 587;
        $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
    }

    if (!$socket) {
        return ["success" => false, "error" => "Hosting connection timeout to Gmail SMTP."];
    }

    $read = function($socket) {
        $response = "";
        while ($str = @fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return $response;
    };

    $send = function($socket, $cmd) use ($read) {
        @fputs($socket, $cmd . "\r\n");
        return $read($socket);
    };

    $read($socket);
    $send($socket, "EHLO " . gethostname());

    if ($port == 587) {
        $startTls = $send($socket, "STARTTLS");
        if (substr($startTls, 0, 3) != '220') {
            @fclose($socket);
            return ["success" => false, "error" => "TLS Negotiation Failed."];
        }
        @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
        $send($socket, "EHLO " . gethostname());
    }

    $authRes = $send($socket, "AUTH LOGIN");
    if (substr($authRes, 0, 3) != '334') {
        @fclose($socket);
        return ["success" => false, "error" => "AUTH LOGIN Failed."];
    }

    $send($socket, base64_encode($user));
    $passRes = $send($socket, base64_encode($pass));
    
    if (substr($passRes, 0, 3) != '235') {
        @fclose($socket);
        return ["success" => false, "error" => "Gmail Authentication Failed."];
    }

    $send($socket, "MAIL FROM: <$user>");
    $send($socket, "RCPT TO: <$toEmail>");
    $send($socket, "DATA");

    $headers  = "From: $fromName <$user>\r\n";
    $headers .= "Reply-To: $user\r\n";
    $headers .= "To: <$toEmail>\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "List-Unsubscribe: <mailto:$user?subject=Unsubscribe>\r\n";
    $headers .= "X-Priority: 3 (Normal)\r\n\r\n";

    $dataRes = $send($socket, $headers . $body . "\r\n.");
    $send($socket, "QUIT");
    @fclose($socket);

    if (substr($dataRes, 0, 3) == '250') {
        return ["success" => true, "message" => "Delivered via Gmail SMTP to " . $toEmail];
    } else {
        return ["success" => false, "error" => "Gmail Server Error."];
    }
}

// 1. Try Gmail SMTP if password provided
if (!empty($smtpPass)) {
    $smtpResult = sendViaGmailSmtp($smtpUser, $smtpPass, $senderName, $toEmail, $subject, $htmlContent);
    if ($smtpResult['success']) {
        echo json_encode([
            "status" => "success",
            "message" => $smtpResult['message']
        ]);
        exit();
    }
}

// 2. Fail-Safe Server Delivery (Always succeeds on cPanel / Shared Hosting)
$domainSender = "connectliveteachcreate@gmail.com";
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: ' . $senderName . ' <' . $domainSender . '>';
$headers[] = 'Reply-To: ' . $senderEmail;
$headers[] = 'List-Unsubscribe: <mailto:' . $senderEmail . '?subject=Unsubscribe>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($toEmail, $subject, $htmlContent, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode([
        "status" => "success",
        "message" => "Delivered successfully to $toEmail (Reply-To: $senderEmail)"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Server mail delivery failed. Check recipient email format."
    ]);
}
?>
