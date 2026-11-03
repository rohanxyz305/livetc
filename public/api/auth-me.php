<?php
require __DIR__ . '/hosting-common.php';
require_method('GET');

$id = current_customer_id();
if (!$id) json_ok(["customer" => null]);

$stmt = db()->prepare("SELECT * FROM customers WHERE id = ?");
$stmt->execute([$id]);
$row = $stmt->fetch();

json_ok(["customer" => $row ? public_customer($row) : null]);
