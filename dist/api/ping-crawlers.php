<?php
// Dynamic Crawl Automation Script for Liveteachcreate
// Parses all sitemaps dynamically and pings IndexNow for 100% of website pages

header('Content-Type: application/json');

$apiKey = "8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c";
$host = "liveteachcreate.com";
$keyLocation = "https://liveteachcreate.com/8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c.txt";

// 1. Base files to always include
$urls = [
    "https://liveteachcreate.com/",
    "https://liveteachcreate.com/llms.txt",
    "https://liveteachcreate.com/llms-full.txt",
    "https://liveteachcreate.com/sitemap.xml"
];

// 2. Helper function to parse XML sitemap for <loc> links
function extractSitemapUrls($filePath, &$urls) {
    if (file_exists($filePath)) {
        $xmlContent = @file_get_contents($filePath);
        if ($xmlContent) {
            $xml = @simplexml_load_string($xmlContent);
            if ($xml) {
                foreach ($xml->url as $urlElement) {
                    $loc = (string)$urlElement->loc;
                    if (!empty($loc) && !in_array($loc, $urls)) {
                        $urls[] = trim($loc);
                    }
                }
            }
        }
    }
}

// 3. Dynamically load all URLs from sitemaps on the server
$rootDir = dirname(__DIR__); // public directory
extractSitemapUrls($rootDir . '/sitemap.xml', $urls);
extractSitemapUrls($rootDir . '/post-sitemap.xml', $urls);

// 4. Batch send to IndexNow (IndexNow supports up to 10,000 URLs per payload)
$payload = [
    "host" => $host,
    "key" => $apiKey,
    "keyLocation" => $keyLocation,
    "urlList" => array_values(array_unique($urls))
];

$ch = curl_init("https://api.indexnow.org/IndexNow");
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8']);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log output for inspection
$logFile = __DIR__ . '/last-ping-log.json';
$logData = [
    "timestamp" => date("Y-m-d H:i:s T"),
    "httpCode" => $httpCode,
    "totalUrlsPushed" => count($payload["urlList"]),
    "urls" => $payload["urlList"]
];
@file_put_contents($logFile, json_encode($logData, JSON_PRETTY_PRINT));

echo json_encode([
    "success" => ($httpCode === 200 || $httpCode === 202),
    "httpCode" => $httpCode,
    "totalPagesPings" => count($payload["urlList"]),
    "timestamp" => date("c"),
    "allPages" => $payload["urlList"]
]);
?>
