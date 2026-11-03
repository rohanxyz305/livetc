<?php
require __DIR__ . '/hosting-common.php';
require_method('POST');

$in = json_input();
$name     = substr(trim(strip_tags($in['name'] ?? '')), 0, 100);
$email    = strtolower(trim($in['email'] ?? ''));
$phone    = preg_replace('/[^0-9+]/', '', $in['phone'] ?? '');
$password = (string) ($in['password'] ?? '');

if ($name === '') json_fail("Please enter your full name.");
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_fail("Please enter a valid email address.");
if (strlen($phone) < 10 || strlen($phone) > 15) json_fail("Please enter a valid phone number.");
if (strlen($password) < 8) json_fail("Password must be at least 8 characters.");

$pdo = db();
$exists = $pdo->prepare("SELECT id FROM customers WHERE email = ?");
$exists->execute([$email]);
if ($exists->fetch()) json_fail("An account with this email already exists. Please sign in.", 409);

$pdo->prepare("INSERT INTO customers (name, email, phone, password_hash) VALUES (?, ?, ?, ?)")
    ->execute([$name, $email, $phone, password_hash($password, PASSWORD_DEFAULT)]);
$id = (int) $pdo->lastInsertId();

session_regenerate_id(true);
$_SESSION['customer_id'] = $id;

json_ok(["customer" => ["id" => $id, "name" => $name, "email" => $email, "phone" => $phone]]);
