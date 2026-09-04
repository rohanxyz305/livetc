<?php
// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error logging suppression to return clean JSON
error_reporting(0);
ini_set('display_errors', 0);

// Get POST JSON data
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData || empty($inputData['apiKey']) || empty($inputData['prompt'])) {
    echo json_encode([
        "status" => "error",
        "message" => "OpenAI API Key and prompt are required."
    ]);
    exit();
}

$apiKey = trim($inputData['apiKey']);
$model = !empty($inputData['model']) ? trim($inputData['model']) : "gpt-4o-mini";
$prompt = $inputData['prompt'];

$payload = [
    "model" => $model,
    "messages" => [
        [
            "role" => "system",
            "content" => "You are an expert SEO Content Strategist and Article Writer inspired by SEOArticlegenAI. Output clean, engaging, Semrush-optimized HTML articles with H2, H3, lists, key takeaways, and FAQ sections."
        ],
        [
            "role" => "user",
            "content" => $prompt
        ]
    ],
    "temperature" => 0.7,
    "max_tokens" => 4000
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer " . $apiKey
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    echo json_encode([
        "status" => "error",
        "message" => "cURL Error: " . $curlErr
    ]);
    exit();
}

$responseData = json_decode($response, true);

if ($httpCode === 200 && isset($responseData['choices'][0]['message']['content'])) {
    echo json_encode([
        "status" => "success",
        "content" => $responseData['choices'][0]['message']['content'],
        "model" => $model
    ]);
} else {
    $errMsg = isset($responseData['error']['message']) ? $responseData['error']['message'] : "OpenAI API request failed with HTTP status " . $httpCode;
    echo json_encode([
        "status" => "error",
        "message" => $errMsg
    ]);
}
?>
