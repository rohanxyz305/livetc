<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(0);
ini_set('display_errors', 0);

$jsonFilePath = __DIR__ . '/seo_results_data.json';

// Shared Hosting Storage Path: uploads folder relative to public/dist root
$uploadDir = __DIR__ . '/../uploads/seo-results/';
if (!file_exists($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}

// Initial Default Cards (Seeded if json file doesn't exist)
$defaultInitialCards = [
  [
    'id' => 'case-1',
    'category' => 'e-commerce',
    'clientName' => 'Handcrafted Apparel & Ethnic Wear Brand',
    'rating' => '5.0',
    'description' => 'Liveteachcreate transformed our organic traffic. We went from almost zero sales to ₹4.8 Lacs per month purely from Google organic search!',
    'industry' => 'Fashion E-Commerce',
    'period' => '90-Day Campaign',
    'growthBadge' => '+340% Organic Traffic',
    'rankBadge' => '#1 Rank on Google',
    'metrics' => [
      ['label' => 'Monthly Organic Clicks', 'before' => '1,200', 'after' => '14,800', 'increase' => '+1,133%'],
      ['label' => 'Google 1st Page Keywords', 'before' => '4', 'after' => '38', 'increase' => '+850%'],
      ['label' => 'Organic Monthly Revenue', 'before' => '₹45,000', 'after' => '₹4,80,000', 'increase' => '+966%']
    ],
    'highlights' => [
      'Implemented Schema Markup (Product, Breadcrumb & Organization)',
      'Optimized 140+ product category pages for long-tail transactional keywords',
      'Acquired 25+ high-authority niche fashion backlinks',
      'Technical SEO audit & site speed score improved from 42 to 96'
    ],
    'proofImage' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
    'quote' => 'Liveteachcreate transformed our organic traffic. We went from almost zero sales to ₹4.8 Lacs per month purely from Google organic search!'
  ],
  [
    'id' => 'case-2',
    'category' => 'gsc-clicks',
    'clientName' => 'Multi-Category Amazon & Flipkart Electronics Brand',
    'rating' => '5.0',
    'description' => 'Our Amazon ACoS dropped from 42% to 14.5% while organic Google search clicks surged by over 700%. Remarkable ROI!',
    'industry' => 'Consumer Electronics & Marketplace',
    'period' => '6-Month Campaign',
    'growthBadge' => '+520% Search Impressions',
    'rankBadge' => '#1 Amazon & Google Rank',
    'metrics' => [
      ['label' => 'Google Search Console Clicks', 'before' => '3,400/mo', 'after' => '28,500/mo', 'increase' => '+738%'],
      ['label' => 'Amazon Seller Central Sales', 'before' => '₹3.2 Lac/mo', 'after' => '₹14.8 Lac/mo', 'increase' => '+362%'],
      ['label' => 'ACoS Reduction', 'before' => '42%', 'after' => '14.5%', 'increase' => '-65% Cost']
    ],
    'highlights' => [
      'Keyword cluster mapping for 180+ electronics accessories',
      'Amazon A+ content & high-converting listing bullet point injection',
      'Google Search Console indexing & canonical tag architecture',
      'Festival season (BBD & GIF) ad strategy and inventory planning'
    ],
    'proofImage' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
    'quote' => 'Our Amazon ACoS dropped from 42% to 14.5% while organic Google search clicks surged by over 700%. Remarkable ROI!'
  ],
  [
    'id' => 'case-3',
    'category' => 'local-seo',
    'clientName' => 'Premium Healthcare & Dental Clinic Chain',
    'rating' => '4.9',
    'description' => 'Our phone lines ring non-stop now. We dominate the Google 3-Pack for local searches across our city locations.',
    'industry' => 'Local Services (Bengaluru & Jaipur)',
    'period' => '60-Day Campaign',
    'growthBadge' => '#1 Map Pack Ranking',
    'rankBadge' => '+420% Patient Inquiries',
    'metrics' => [
      ['label' => 'Google Maps 3-Pack Rank', 'before' => 'Position #14', 'after' => 'Position #1', 'increase' => 'Top Rank'],
      ['label' => 'Direct Phone Calls / Mo', 'before' => '35 Calls', 'after' => '210 Calls', 'increase' => '+500%'],
      ['label' => 'Google Reviews Rating', 'before' => '4.1 ★ (20)', 'after' => '4.9 ★ (180+)', 'increase' => '+160 Reviews']
    ],
    'highlights' => [
      'Google Business Profile (GBP) complete optimization & geotagged photos',
      'Local NAP (Name, Address, Phone) citation audit across 50+ Indian directories',
      'Localized city service pages targeting "best dental clinic in Bengaluru"',
      'Automated review generation campaign'
    ],
    'proofImage' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop',
    'quote' => 'Our phone lines ring non-stop now. We dominate the Google 3-Pack for local searches across our city locations.'
  ],
  [
    'id' => 'case-4',
    'category' => 'd2c-revenue',
    'clientName' => 'Organic Skincare & D2C Cosmetics Brand',
    'rating' => '5.0',
    'description' => 'The team at Liveteachcreate built our organic blog strategy from scratch. We reached ₹18.5 Lacs monthly sales without relying solely on paid Meta ads!',
    'industry' => 'Beauty & Direct-to-Consumer',
    'period' => '4-Month Campaign',
    'growthBadge' => '₹18.5 Lacs Organic GMV',
    'rankBadge' => '10/10 Semrush Score',
    'metrics' => [
      ['label' => 'Organic Monthly Revenue', 'before' => '₹1.8 Lac', 'after' => '₹18.5 Lac', 'increase' => '+927%'],
      ['label' => 'Blog Search Traffic', 'before' => '450 visits', 'after' => '22,000 visits', 'increase' => '+4,788%'],
      ['label' => 'Shopify Conversion Rate', 'before' => '0.9%', 'after' => '3.4%', 'increase' => '+277%']
    ],
    'highlights' => [
      'Published 45+ Semrush 10/10 On-Page SEO long-form article guides',
      'Shopify speed optimization & 1-click checkout conversion tuning',
      'List-Unsubscribe email marketing automation integration',
      'Influencer outreach & high-tier PR backlinks'
    ],
    'proofImage' => 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop',
    'quote' => 'The team at Liveteachcreate built our organic blog strategy from scratch. We reached ₹18.5 Lacs monthly sales without relying solely on paid Meta ads!'
  ]
];

function getSavedData($path, $defaultData) {
    if (file_exists($path)) {
        $content = @file_get_contents($path);
        $decoded = @json_decode($content, true);
        if (is_array($decoded) && count($decoded) > 0) {
            return $decoded;
        }
    }
    // Seed initial JSON file if empty or missing
    @file_put_contents($path, json_encode($defaultData, JSON_PRETTY_PRINT));
    return $defaultData;
}

function saveData($path, $data) {
    return @file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

// GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        "status" => "success",
        "data" => getSavedData($jsonFilePath, $defaultInitialCards)
    ]);
    exit();
}

// DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' || (isset($_GET['action']) && $_GET['action'] === 'delete')) {
    $rawInput = file_get_contents("php://input");
    $inputData = json_decode($rawInput, true);
    $targetId = isset($inputData['id']) ? $inputData['id'] : (isset($_GET['id']) ? $_GET['id'] : '');

    if (empty($targetId)) {
        echo json_encode(["status" => "error", "message" => "Item ID required for deletion."]);
        exit();
    }

    $existing = getSavedData($jsonFilePath, $defaultInitialCards);
    $filtered = array_values(array_filter($existing, function($item) use ($targetId) {
        return $item['id'] !== $targetId;
    }));

    saveData($jsonFilePath, $filtered);
    echo json_encode(["status" => "success", "message" => "Item deleted successfully.", "data" => $filtered]);
    exit();
}

// POST request (Upload/Publish or Update)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $imageUrl = '';

    // Handle File Upload to Shared Hosting Storage
    if (isset($_FILES['proofImageFile']) && $_FILES['proofImageFile']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['proofImageFile']['tmp_name'];
        $fileName = $_FILES['proofImageFile']['name'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
        if (in_array($fileExtension, $allowedExtensions)) {
            $newFileName = 'seo_proof_' . time() . '_' . rand(1000, 9999) . '.' . $fileExtension;
            $destPath = $uploadDir . $newFileName;

            if (@move_uploaded_file($fileTmpPath, $destPath)) {
                // Generate permanent web URL on shared hosting
                $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
                $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'liveteachcreate.com';
                $imageUrl = '/uploads/seo-results/' . $newFileName;
            }
        }
    }

    $editId = isset($_POST['id']) ? trim($_POST['id']) : '';
    $clientName = isset($_POST['clientName']) ? trim($_POST['clientName']) : '';
    $rating = isset($_POST['rating']) ? trim($_POST['rating']) : '5.0';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';
    $category = isset($_POST['category']) ? trim($_POST['category']) : 'e-commerce';
    $growthBadge = isset($_POST['growthBadge']) ? trim($_POST['growthBadge']) : '';
    $rankBadge = isset($_POST['rankBadge']) ? trim($_POST['rankBadge']) : '';
    $quote = isset($_POST['quote']) ? trim($_POST['quote']) : '';

    if (empty($imageUrl) && isset($_POST['proofImageUrl']) && !empty($_POST['proofImageUrl'])) {
        $imageUrl = trim($_POST['proofImageUrl']);
    }

    // JSON body fallback
    if (empty($clientName)) {
        $jsonInput = json_decode(file_get_contents("php://input"), true);
        if ($jsonInput) {
            $editId = isset($jsonInput['id']) ? trim($jsonInput['id']) : '';
            $clientName = isset($jsonInput['clientName']) ? trim($jsonInput['clientName']) : '';
            $rating = isset($jsonInput['rating']) ? trim($jsonInput['rating']) : '5.0';
            $description = isset($jsonInput['description']) ? trim($jsonInput['description']) : '';
            $category = isset($jsonInput['category']) ? trim($jsonInput['category']) : 'e-commerce';
            $growthBadge = isset($jsonInput['growthBadge']) ? trim($jsonInput['growthBadge']) : '';
            $rankBadge = isset($jsonInput['rankBadge']) ? trim($jsonInput['rankBadge']) : '';
            if (empty($imageUrl) && isset($jsonInput['proofImage'])) {
                $imageUrl = trim($jsonInput['proofImage']);
            }
        }
    }

    if (empty($clientName)) {
        echo json_encode(["status" => "error", "message" => "Client name is required."]);
        exit();
    }

    $existing = getSavedData($jsonFilePath, $defaultInitialCards);

    // If editId is provided and exists, UPDATE the entry
    $itemIndex = -1;
    if (!empty($editId)) {
        foreach ($existing as $index => $item) {
            if ($item['id'] === $editId) {
                $itemIndex = $index;
                break;
            }
        }
    }

    if ($itemIndex >= 0) {
        // UPDATE existing card
        $existingItem = $existing[$itemIndex];
        $updatedItem = [
            'id' => $editId,
            'clientName' => $clientName,
            'rating' => $rating,
            'description' => $description ?: (isset($existingItem['description']) ? $existingItem['description'] : ''),
            'category' => $category,
            'industry' => isset($existingItem['industry']) ? $existingItem['industry'] : 'Client Success',
            'period' => isset($existingItem['period']) ? $existingItem['period'] : 'Verified Results',
            'growthBadge' => $growthBadge ?: (isset($existingItem['growthBadge']) ? $existingItem['growthBadge'] : '+300% Traffic Surge'),
            'rankBadge' => $rankBadge ?: (isset($existingItem['rankBadge']) ? $existingItem['rankBadge'] : '#1 Rank on Google'),
            'metrics' => isset($existingItem['metrics']) ? $existingItem['metrics'] : [],
            'highlights' => isset($existingItem['highlights']) ? $existingItem['highlights'] : [],
            'proofImage' => $imageUrl ?: (isset($existingItem['proofImage']) ? $existingItem['proofImage'] : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop'),
            'quote' => $description ?: (isset($existingItem['quote']) ? $existingItem['quote'] : ''),
            'updatedAt' => date('c')
        ];
        $existing[$itemIndex] = $updatedItem;
        saveData($jsonFilePath, $existing);

        echo json_encode([
            "status" => "success",
            "message" => "Card updated successfully!",
            "data" => $updatedItem,
            "all" => $existing
        ]);
        exit();
    } else {
        // CREATE new card
        $newItem = [
            'id' => 'custom-' . time() . '-' . rand(100, 999),
            'clientName' => $clientName,
            'rating' => $rating,
            'description' => $description,
            'category' => $category,
            'industry' => 'Client Achievement',
            'period' => 'Verified Results',
            'growthBadge' => $growthBadge ?: '+300% Organic Growth',
            'rankBadge' => $rankBadge ?: '#1 Rank on Google',
            'metrics' => [],
            'highlights' => [],
            'proofImage' => $imageUrl ?: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
            'quote' => $description,
            'createdAt' => date('c')
        ];

        array_unshift($existing, $newItem);
        saveData($jsonFilePath, $existing);

        echo json_encode([
            "status" => "success",
            "message" => "Client achievement uploaded to hosting storage & published!",
            "data" => $newItem,
            "all" => $existing
        ]);
        exit();
    }
}
?>
