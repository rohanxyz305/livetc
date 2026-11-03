<?php
require __DIR__ . '/hosting-common.php';
require_method('POST');

$customerId = require_login();
$in = json_input();

$planKey = strtolower(trim($in['plan'] ?? ''));
if (!isset($PLANS[$planKey])) json_fail("Unknown plan selected.");
$plan = $PLANS[$planKey];
$domain = substr(trim(strip_tags($in['domain'] ?? '')), 0, 150);

$pdo = db();
$c = $pdo->prepare("SELECT * FROM customers WHERE id = ?");
$c->execute([$customerId]);
$customer = $c->fetch();
if (!$customer) json_fail("Please sign in to continue.", 401);

[$code, $order] = rzp_api("POST", "/orders", [
    "amount"   => $plan['price'] * 100, // paise
    "currency" => "INR",
    "receipt"  => "hosting_c" . $customerId . "_" . time(),
    "notes"    => [
        "service"     => "Web Hosting",
        "plan"        => $plan['name'],
        "customer_id" => (string) $customerId,
        "email"       => $customer['email'],
        "domain"      => $domain,
    ],
]);
if ($code !== 200 || empty($order['id'])) json_fail("Could not start payment. Please try again.", 502);

$pdo->prepare("INSERT INTO hosting_orders (customer_id, plan, amount, domain, razorpay_order_id) VALUES (?, ?, ?, ?, ?)")
    ->execute([$customerId, $plan['name'], $plan['price'], $domain, $order['id']]);

json_ok([
    "key_id"   => $CFG['rzp_key_id'],
    "order_id" => $order['id'],
    "amount"   => $order['amount'],
    "currency" => $order['currency'],
    "plan"     => $plan['name'],
    "customer" => public_customer($customer),
]);
