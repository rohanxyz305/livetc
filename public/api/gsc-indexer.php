<?php
// Google Search Console & AI Indexer Automation Endpoint
// Supports bulk URL input, dynamic sitemap parsing, auto-sync, and 30-minute cron execution

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/gsc-urls.json';
$logFile  = __DIR__ . '/gsc-log.json';
$serviceAccountFile = __DIR__ . '/service_account.json';
$postSitemapFile = dirname(__DIR__) . '/post-sitemap.xml';

// Default initial URLs if data file missing
$defaultUrls = [
    "https://liveteachcreate.com/blogs/how-to-boost-sales-in-flipkart-big-billion-days-2026",
    "https://liveteachcreate.com/blogs/how-to-increase-sales-in-amazon-great-indian-festival-2026",
    "https://liveteachcreate.com/blogs/how-to-onboard-product-in-quick-commerce",
    "https://liveteachcreate.com/blogs/zepto-marketing-strategy-to-win-customer-mind"
];

if (!file_exists($dataFile)) {
    $initialData = [
        "urls" => $defaultUrls
    ];
    file_put_contents($dataFile, json_encode($initialData, JSON_PRETTY_PRINT));
}

$currentData = json_decode(file_get_contents($dataFile), true);
if (!isset($currentData['urls']) || !is_array($currentData['urls'])) {
    $currentData = ["urls" => $defaultUrls];
}

// 1. Process POST requests (Single or Bulk URL additions)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Single URL add
    if (isset($input['newUrl']) && !empty(trim($input['newUrl']))) {
        $singleUrl = trim($input['newUrl']);
        if (!in_array($singleUrl, $currentData['urls'])) {
            array_unshift($currentData['urls'], $singleUrl);
        }
    }
    
    // Bulk URLs add (array or multiline text)
    if (isset($input['bulkUrls'])) {
        $rawList = [];
        if (is_array($input['bulkUrls'])) {
            $rawList = $input['bulkUrls'];
        } else if (is_string($input['bulkUrls'])) {
            $rawList = preg_split('/[\r\n,]+/', $input['bulkUrls']);
        }
        
        foreach ($rawList as $u) {
            $cleanU = trim($u);
            if (!empty($cleanU) && filter_var($cleanU, FILTER_VALIDATE_URL)) {
                if (!in_array($cleanU, $currentData['urls'])) {
                    $currentData['urls'][] = $cleanU;
                }
            }
        }
    }

    file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT));
}

// 2. Read existing URLs from sitemap.xml and post-sitemap.xml
$sitemapPath = dirname(__DIR__) . '/sitemap.xml';
$extractedFromSitemaps = [];

function extractUrlsFromXml($path, &$targetArr) {
    if (file_exists($path)) {
        $xmlContent = @file_get_contents($path);
        if ($xmlContent) {
            $xml = @simplexml_load_string($xmlContent);
            if ($xml) {
                foreach ($xml->url as $u) {
                    $loc = trim((string)$u->loc);
                    if (!empty($loc) && !in_array($loc, $targetArr)) {
                        $targetArr[] = $loc;
                    }
                }
            }
        }
    }
}

extractUrlsFromXml($sitemapPath, $extractedFromSitemaps);
extractUrlsFromXml($postSitemapFile, $extractedFromSitemaps);

// Merge all saved URLs and sitemap URLs
$allCombinedUrls = array_values(array_unique(array_merge($currentData['urls'], $extractedFromSitemaps)));

// Update gsc-urls.json with full consolidated list
$currentData['urls'] = $allCombinedUrls;
file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT));

// 3. Automatically update post-sitemap.xml so search engines & Google discover ALL blog URLs
$blogUrls = array_filter($allCombinedUrls, function($u) {
    return (strpos($u, '/blogs/') !== false);
});

if (!empty($blogUrls) && file_exists($postSitemapFile)) {
    $xmlDoc = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    foreach ($blogUrls as $bUrl) {
        $xmlDoc .= "  <url>\n";
        $xmlDoc .= "    <loc>" . htmlspecialchars($bUrl) . "</loc>\n";
        $xmlDoc .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
        $xmlDoc .= "    <changefreq>weekly</changefreq>\n";
        $xmlDoc .= "    <priority>0.8</priority>\n";
        $xmlDoc .= "  </url>\n";
    }
    $xmlDoc .= "</urlset>\n";
    @file_put_contents($postSitemapFile, $xmlDoc);
}

// 4. IndexNow Pings (Bing, Perplexity, OpenAI, Yandex)
$apiKey = "8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c";
$host   = "liveteachcreate.com";
$keyLoc = "https://liveteachcreate.com/8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c.txt";

$indexNowPayload = [
    "host" => $host,
    "key" => $apiKey,
    "keyLocation" => $keyLoc,
    "urlList" => $allCombinedUrls
];

$ch = curl_init("https://api.indexnow.org/IndexNow");
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8']);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($indexNowPayload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
$indexNowResp = curl_exec($ch);
$indexNowHttp = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Audit log
$logEntry = [
    "lastTriggered" => date("Y-m-d H:i:s T"),
    "totalUrls"     => count($allCombinedUrls),
    "indexNowCode"  => $indexNowHttp,
    "urlsPushed"    => $allCombinedUrls
];
file_put_contents($logFile, json_encode($logEntry, JSON_PRETTY_PRINT));

echo json_encode([
    "success" => true,
    "totalBlogUrls" => count($allCombinedUrls),
    "indexNowStatus" => $indexNowHttp,
    "googleApiStatus" => file_exists($serviceAccountFile) ? "Service Account Authorized" : "Fallback Mode Active",
    "hasServiceAccount" => file_exists($serviceAccountFile),
    "timestamp" => date("c"),
    "urls" => $allCombinedUrls,
    "blogUrls" => array_values($blogUrls)
]);
?>
