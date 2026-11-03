<?php
require __DIR__ . '/hosting-common.php';
require_method('POST');

$in = json_input();
$email    = strtolower(trim($in['email'] ?? ''));
$password = (string) ($in['password'] ?? '');

if (!$email || !$password) json_fail("Please enter your email and password.");

$stmt = db()->prepare("SELECT * FROM customers WHERE email = ?");
$stmt->execute([$email]);
$row = $stmt->fetch();

if (!$row || !password_verify($password, $row['password_hash'])) {
    usleep(500000); // slow down password guessing
    json_fail("Incorrect email or password.", 401);
}

session_regenerate_id(true);
$_SESSION['customer_id'] = (int) $row['id'];

json_ok(["customer" => public_customer($row)]);
