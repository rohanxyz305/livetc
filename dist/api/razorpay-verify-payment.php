<?php
require __DIR__ . '/hosting-common.php';
require_method('POST');

$customerId = require_login();
$in = json_input();
$orderId   = $in['razorpay_order_id'] ?? '';
$paymentId = $in['razorpay_payment_id'] ?? '';
$signature = $in['razorpay_signature'] ?? '';

if (!$orderId || !$paymentId || !$signature) json_fail("Missing payment details.");

$expected = hash_hmac('sha256', $orderId . "|" . $paymentId, $CFG['rzp_key_secret']);
if (!hash_equals($expected, $signature)) json_fail("Payment verification failed.");

// The order must belong to the signed-in customer.
$stmt = db()->prepare("SELECT plan FROM hosting_orders WHERE razorpay_order_id = ? AND customer_id = ?");
$stmt->execute([$orderId, $customerId]);
$order = $stmt->fetch();
if (!$order) json_fail("Order not found.", 404);

mark_order_paid($orderId, $paymentId);

json_ok(["payment_id" => $paymentId, "plan" => $order['plan']]);
