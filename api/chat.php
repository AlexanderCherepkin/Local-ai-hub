<?php
header('Content-Type: application/json');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

if (!isset($data['message']) || empty(trim($data['message']))) {
    http_response_code(400);
    echo json_encode(["error" => ["message" => "Сообщение не получено."]]);
    exit;
}

$user_message = trim($data['message']);

// 🔁 Прокси-редирект к OpenAI или тест-ответ (замени по необходимости)
$proxy_url = 'https://openai-proxy-pzdr.onrender.com/chat'; // ← можно заменить на свой

$post_data = ['message' => $user_message];

$ch = curl_init($proxy_url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($post_data),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
]);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    file_put_contents('curl_errors.log', date('c') . " - CURL error: $curl_error\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(["error" => ["message" => "Ошибка CURL."]]);
    exit;
}

$response_data = json_decode($response, true);

if ($http_code >= 400 || isset($response_data['error'])) {
    echo json_encode(["error" => $response_data['error'] ?? ["message" => "Неизвестная ошибка API"]]);
    exit;
}

echo $response;
