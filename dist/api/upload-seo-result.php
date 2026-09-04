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
$uploadDir = __DIR__ . '/../../public/uploads/seo-results/';
if (!file_exists($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}

function getSavedData($path) {
    if (file_exists($path)) {
        $content = @file_get_contents($path);
        $decoded = @json_decode($content, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return [];
}

function saveData($path, $data) {
    return @file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

// GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        "status" => "success",
        "data" => getSavedData($jsonFilePath)
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

    $existing = getSavedData($jsonFilePath);
    $filtered = array_values(array_filter($existing, function($item) use ($targetId) {
        return $item['id'] !== $targetId;
    }));

    saveData($jsonFilePath, $filtered);
    echo json_encode(["status" => "success", "message" => "Item deleted successfully.", "data" => $filtered]);
    exit();
}

// POST request (Upload/Publish)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $imageUrl = '';

    if (isset($_FILES['proofImageFile']) && $_FILES['proofImageFile']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['proofImageFile']['tmp_name'];
        $fileName = $_FILES['proofImageFile']['name'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        if (in_array($fileExtension, $allowedExtensions)) {
            $newFileName = 'seo_proof_' . time() . '_' . rand(1000, 9999) . '.' . $fileExtension;
            $destPath = $uploadDir . $newFileName;

            if (@move_uploaded_file($fileTmpPath, $destPath)) {
                $imageUrl = '/uploads/seo-results/' . $newFileName;
            }
        }
    }

    $clientName = isset($_POST['clientName']) ? $_POST['clientName'] : '';
    $websiteName = isset($_POST['websiteName']) ? $_POST['websiteName'] : '';
    $rating = isset($_POST['rating']) ? $_POST['rating'] : '5';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $category = isset($_POST['category']) ? $_POST['category'] : 'e-commerce';
    $industry = isset($_POST['industry']) ? $_POST['industry'] : '';
    $period = isset($_POST['period']) ? $_POST['period'] : '';
    $growthBadge = isset($_POST['growthBadge']) ? $_POST['growthBadge'] : '';
    $rankBadge = isset($_POST['rankBadge']) ? $_POST['rankBadge'] : '';
    $quote = isset($_POST['quote']) ? $_POST['quote'] : '';
    $metricsRaw = isset($_POST['metrics']) ? $_POST['metrics'] : '';
    $highlightsRaw = isset($_POST['highlights']) ? $_POST['highlights'] : '';

    if (empty($imageUrl) && isset($_POST['proofImageUrl']) && !empty($_POST['proofImageUrl'])) {
        $imageUrl = $_POST['proofImageUrl'];
    }

    // JSON fallback
    if (empty($clientName)) {
        $jsonInput = json_decode(file_get_contents("php://input"), true);
        if ($jsonInput) {
            $clientName = isset($jsonInput['clientName']) ? $jsonInput['clientName'] : '';
            $websiteName = isset($jsonInput['websiteName']) ? $jsonInput['websiteName'] : '';
            $rating = isset($jsonInput['rating']) ? $jsonInput['rating'] : '5';
            $description = isset($jsonInput['description']) ? $jsonInput['description'] : '';
            $category = isset($jsonInput['category']) ? $jsonInput['category'] : 'e-commerce';
            $industry = isset($jsonInput['industry']) ? $jsonInput['industry'] : '';
            $period = isset($jsonInput['period']) ? $jsonInput['period'] : '';
            $growthBadge = isset($jsonInput['growthBadge']) ? $jsonInput['growthBadge'] : '';
            $rankBadge = isset($jsonInput['rankBadge']) ? $jsonInput['rankBadge'] : '';
            $quote = isset($jsonInput['quote']) ? $jsonInput['quote'] : '';
            if (empty($imageUrl) && isset($jsonInput['proofImage'])) {
                $imageUrl = $jsonInput['proofImage'];
            }
            if (is_array(isset($jsonInput['metrics']) ? $jsonInput['metrics'] : null)) {
                $metrics = $jsonInput['metrics'];
            }
            if (is_array(isset($jsonInput['highlights']) ? $jsonInput['highlights'] : null)) {
                $highlights = $jsonInput['highlights'];
            }
        }
    }

    if (empty($clientName)) {
        echo json_encode(["status" => "error", "message" => "Client name is required."]);
        exit();
    }

    if (!isset($metrics)) {
        $metrics = @json_decode($metricsRaw, true);
        if (!is_array($metrics)) $metrics = [];
    }

    if (!isset($highlights)) {
        if (is_string($highlightsRaw)) {
            $highlights = array_filter(array_map('trim', explode("\n", $highlightsRaw)));
        } else {
            $highlights = [];
        }
    }

    $newItem = [
        'id' => 'custom-' . time() . '-' . rand(100, 999),
        'clientName' => $clientName,
        'websiteName' => $websiteName,
        'rating' => $rating,
        'description' => $description ?: $quote,
        'category' => $category,
        'industry' => $industry ?: 'Client Achievement',
        'period' => $period ?: 'Verified Campaign',
        'growthBadge' => $growthBadge ?: '+300% Organic Growth',
        'rankBadge' => $rankBadge ?: '#1 Rank on Google',
        'metrics' => $metrics,
        'highlights' => array_values($highlights),
        'proofImage' => $imageUrl ?: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
        'quote' => $description ?: $quote,
        'createdAt' => date('c')
    ];

    $existing = getSavedData($jsonFilePath);
    array_unshift($existing, $newItem);
    saveData($jsonFilePath, $existing);

    echo json_encode([
        "status" => "success",
        "message" => "Client achievement uploaded and published successfully!",
        "data" => $newItem,
        "all" => $existing
    ]);
    exit();
}
?>
