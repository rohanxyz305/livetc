<?php
require __DIR__ . '/hosting-common.php';
require_method('POST');

$_SESSION = [];
setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => '/', 'secure' => true, 'httponly' => true, 'samesite' => 'Lax']);
session_destroy();

json_ok();
