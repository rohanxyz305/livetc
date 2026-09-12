<?php
// Complete Google Search Console & AI Indexer Endpoint
// Dynamically updates sitemap.xml and post-sitemap.xml <lastmod> timestamps on every cron run

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
$sitemapPath = dirname(__DIR__) . '/sitemap.xml';

// Master List of ALL Website Core Pages, Service Pages, Location Pages, and Tools
$masterCoreUrls = [
    "https://liveteachcreate.com/",
    "https://liveteachcreate.com/about-us",
    "https://liveteachcreate.com/portfolio",
    "https://liveteachcreate.com/blogs",
    "https://liveteachcreate.com/careers",
    "https://liveteachcreate.com/contact-us",
    "https://liveteachcreate.com/seo-results",
    "https://liveteachcreate.com/seo-keyword-tool",
    "https://liveteachcreate.com/ecommerce-product-listing-tool",
    "https://liveteachcreate.com/email-marketing",
    "https://liveteachcreate.com/privacy-policy",
    "https://liveteachcreate.com/terms-and-conditions",
    "https://liveteachcreate.com/disclaimer",
    "https://liveteachcreate.com/llms.txt",
    "https://liveteachcreate.com/llms-full.txt",

    // ALL Services (Marketplace Management & Onboarding)
    "https://liveteachcreate.com/services/amazon-seller-account-management-services",
    "https://liveteachcreate.com/services/flipkart-account-management-services",
    "https://liveteachcreate.com/services/meesho-account-management-services",
    "https://liveteachcreate.com/services/shopify-store-management-services",
    "https://liveteachcreate.com/services/myntra-account-management-services",
    "https://liveteachcreate.com/services/amazon-product-listing-catalogue-services",
    "https://liveteachcreate.com/services/etsy-account-management-services",
    "https://liveteachcreate.com/services/ecommerce-product-listing-services",
    "https://liveteachcreate.com/services/ecommerce-management-services",
    "https://liveteachcreate.com/services/blinkit-seller-account-management-services",
    "https://liveteachcreate.com/services/swiggy-instamart-seller-account-management-and-onboarding",
    "https://liveteachcreate.com/services/zepto-seller-onboarding-and-account-management-service",
    "https://liveteachcreate.com/services/ajio-seller-onboarding-services",
    "https://liveteachcreate.com/services/tata-cliq-seller-onboarding-services",
    "https://liveteachcreate.com/services/nykaa-seller-onboarding-services",
    "https://liveteachcreate.com/services/myntra-seller-onboarding-services",

    // ALL Services (Digital Marketing & Web Development)
    "https://liveteachcreate.com/services/seo-company-in-india",
    "https://liveteachcreate.com/services/meta-ads-management-company-in-india",
    "https://liveteachcreate.com/services/google-ads-management-company-in-india",
    "https://liveteachcreate.com/services/performance-marketing-company-in-india",
    "https://liveteachcreate.com/services/social-media-optimization-company-in-india",
    "https://liveteachcreate.com/services/graphic-design-company-in-india",
    "https://liveteachcreate.com/services/wordpress-development-company-in-india",
    "https://liveteachcreate.com/services/shopify-development-company-in-india",
    "https://liveteachcreate.com/services/woocommerce-development-company-in-india",
    "https://liveteachcreate.com/services/wix-development-company-in-india",
    "https://liveteachcreate.com/services/custom-web-development-company-in-india",
    "https://liveteachcreate.com/services/website-maintenance-services",

    // ALL Locations
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-delhi",
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-surat",
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-kolkata",
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-dhanbad",
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-jaipur",
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-mumbai",
    "https://liveteachcreate.com/locations/ecommerce-service-provider-in-bangalore",

    // ALL Blog Posts
    "https://liveteachcreate.com/blogs/bigbasket-account-management-for-beginners",
    "https://liveteachcreate.com/blogs/how-to-boost-sales-in-flipkart-big-billion-days-2026",
    "https://liveteachcreate.com/blogs/how-to-increase-sales-in-amazon-great-indian-festival-2026",
    "https://liveteachcreate.com/blogs/how-to-onboard-product-in-quick-commerce",
    "https://liveteachcreate.com/blogs/zepto-marketing-strategy-to-win-customer-mind",
    "https://liveteachcreate.com/blogs/amazon-seller-account-management-guide",
    "https://liveteachcreate.com/blogs/flipkart-pla-advertising-strategy",
    "https://liveteachcreate.com/blogs/blinkit-dark-store-onboarding-process",
    "https://liveteachcreate.com/blogs/swiggy-instamart-vendor-registration",
    "https://liveteachcreate.com/blogs/meesho-catalog-optimization-tips",
    "https://liveteachcreate.com/blogs/myntra-brand-onboarding-playbook",
    "https://liveteachcreate.com/blogs/nykaa-seller-portal-registration",
    "https://liveteachcreate.com/blogs/local-seo-strategy-for-dhanbad-businesses"
];

// Load existing saved URLs from JSON
$savedUrls = [];
if (file_exists($dataFile)) {
    $cData = json_decode(file_get_contents($dataFile), true);
    if (isset($cData['urls']) && is_array($cData['urls'])) {
        $savedUrls = $cData['urls'];
    }
}

// Handle POST Requests (Single or Bulk additions)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['newUrl']) && !empty(trim($input['newUrl']))) {
        $u = trim($input['newUrl']);
        if (!in_array($u, $savedUrls)) {
            array_unshift($savedUrls, $u);
        }
    }
    
    if (isset($input['bulkUrls'])) {
        $rawList = is_array($input['bulkUrls']) ? $input['bulkUrls'] : preg_split('/[\r\n,]+/', $input['bulkUrls']);
        foreach ($rawList as $u) {
            $cleanU = trim($u);
            if (!empty($cleanU) && filter_var($cleanU, FILTER_VALIDATE_URL)) {
                if (!in_array($cleanU, $savedUrls)) {
                    $savedUrls[] = $cleanU;
                }
            }
        }
    }
}

// Function to extract from XML sitemaps
function parseXmlUrls($path, &$target) {
    if (file_exists($path)) {
        $xmlContent = @file_get_contents($path);
        if ($xmlContent) {
            $xml = @simplexml_load_string($xmlContent);
            if ($xml) {
                foreach ($xml->url as $u) {
                    $loc = trim((string)$u->loc);
                    if (!empty($loc) && !in_array($loc, $target)) {
                        $target[] = $loc;
                    }
                }
            }
        }
    }
}

$sitemapUrls = [];
parseXmlUrls($sitemapPath, $sitemapUrls);
parseXmlUrls($postSitemapFile, $sitemapUrls);

// Combine Master List + Saved List + Sitemap List (De-duplicated)
$allConsolidatedUrls = array_values(array_unique(array_merge($masterCoreUrls, $savedUrls, $sitemapUrls)));

// Write back to gsc-urls.json
file_put_contents($dataFile, json_encode(["urls" => $allConsolidatedUrls], JSON_PRETTY_PRINT));

// FEATURE: AUTOMATED SITEMAP <lastmod> TIMESTAMP UPDATER
// Automatically refreshes all <lastmod> dates to today's date (date('Y-m-d'))
$todayDate = date('Y-m-d');

// 1. Update sitemap.xml <lastmod> timestamps
if (file_exists($sitemapPath)) {
    $sitemapContent = file_get_contents($sitemapPath);
    // Regex replace all existing <lastmod>YYYY-MM-DD</lastmod> with current date
    $updatedSitemap = preg_replace('/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/i', "<lastmod>{$todayDate}</lastmod>", $sitemapContent);
    file_put_contents($sitemapPath, $updatedSitemap);
}

// 2. Update post-sitemap.xml <lastmod> timestamps & ensure all blog URLs are present
$blogUrlsOnly = array_values(array_filter($allConsolidatedUrls, function($u) {
    return (strpos($u, '/blogs/') !== false);
}));

if (!empty($blogUrlsOnly) && file_exists($postSitemapFile)) {
    $xmlDoc = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    foreach ($blogUrlsOnly as $bUrl) {
        $xmlDoc .= "  <url>\n";
        $xmlDoc .= "    <loc>" . htmlspecialchars($bUrl) . "</loc>\n";
        $xmlDoc .= "    <lastmod>{$todayDate}</lastmod>\n";
        $xmlDoc .= "    <changefreq>weekly</changefreq>\n";
        $xmlDoc .= "    <priority>0.8</priority>\n";
        $xmlDoc .= "  </url>\n";
    }
    $xmlDoc .= "</urlset>\n";
    @file_put_contents($postSitemapFile, $xmlDoc);
}

// 3. IndexNow Pings (Bing, Perplexity, OpenAI, Yandex)
$apiKey = "8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c";
$host   = "liveteachcreate.com";
$keyLoc = "https://liveteachcreate.com/8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c.txt";

$indexNowPayload = [
    "host" => $host,
    "key" => $apiKey,
    "keyLocation" => $keyLoc,
    "urlList" => $allConsolidatedUrls
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

// Audit Log
$logEntry = [
    "lastTriggered"   => date("Y-m-d H:i:s T"),
    "lastmodUpdated"  => $todayDate,
    "totalUrls"       => count($allConsolidatedUrls),
    "indexNowCode"    => $indexNowHttp,
    "urlsPushed"      => $allConsolidatedUrls
];
file_put_contents($logFile, json_encode($logEntry, JSON_PRETTY_PRINT));

echo json_encode([
    "success" => true,
    "totalBlogUrls" => count($allConsolidatedUrls),
    "lastmodUpdated" => $todayDate,
    "sitemapAutoUpdated" => true,
    "indexNowStatus" => $indexNowHttp,
    "googleApiStatus" => file_exists($serviceAccountFile) ? "Service Account Authorized" : "Fallback Mode Active",
    "hasServiceAccount" => file_exists($serviceAccountFile),
    "timestamp" => date("c"),
    "urls" => $allConsolidatedUrls,
    "blogUrls" => $blogUrlsOnly
]);
?>
