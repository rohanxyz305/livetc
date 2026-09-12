<?php
// Automated Crawler Ping Endpoint for Liveteachcreate
// Triggered via cPanel Cron Job every 5 minutes

header('Content-Type: application/json');

$apiKey = "8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c";
$host = "liveteachcreate.com";
$keyLocation = "https://liveteachcreate.com/8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c.txt";

$urlList = [
    "https://liveteachcreate.com/",
    "https://liveteachcreate.com/services",
    "https://liveteachcreate.com/privacy-policy",
    "https://liveteachcreate.com/llms.txt",
    "https://liveteachcreate.com/llms-full.txt",
    "https://liveteachcreate.com/sitemap.xml"
];

$payload = [
    "host" => $host,
    "key" => $apiKey,
    "keyLocation" => $keyLocation,
    "urlList" => $urlList
];

// 1. Send IndexNow Ping to Bing / Perplexity / OpenAI
$ch = curl_init("https://api.indexnow.org/IndexNow");
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8']);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log trigger time locally for audit
$logFile = __DIR__ . '/last-ping-log.json';
$logData = [
    "timestamp" => date("Y-m-d H:i:s T"),
    "status" => $httpCode,
    "response" => $response,
    "pingsCount" => count($urlList)
];
@file_put_contents($logFile, json_encode($logData, JSON_PRETTY_PRINT));

echo json_encode([
    "success" => ($httpCode === 200 || $httpCode === 202),
    "httpCode" => $httpCode,
    "timestamp" => date("c"),
    "urlsNotified" => count($urlList)
]);
?>
