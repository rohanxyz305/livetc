<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(0);
ini_set('display_errors', 0);

$jsonFilePath = __DIR__ . '/seo_results_data.json';

if (file_exists($jsonFilePath)) {
    $content = @file_get_contents($jsonFilePath);
    $decoded = @json_decode($content, true);
    if (is_array($decoded)) {
        echo json_encode([
            "status" => "success",
            "data" => $decoded
        ]);
        exit();
    }
}

echo json_encode([
    "status" => "success",
    "data" => []
]);
?>
