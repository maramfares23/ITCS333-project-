<?php
header('Content-Type: application/json');
$filename = 'groups.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($filename)) {
        echo file_get_contents($filename);
    } else {
        echo json_encode([]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['title'], $input['subject'], $input['location'], $input['date'], $input['time'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing fields']);
        exit;
    }
    $data = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];
    $newGroup = [
        'id' => count($data) + 1,
        'title' => $input['title'],
        'subject' => $input['subject'],
        'location' => $input['location'],
        'date' => $input['date'],
        'time' => $input['time'],
        'description' => $input['description'] ?? ''
    ];
    $data[] = $newGroup;
    file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(['message' => 'Group added successfully']);
    exit;
}
?>
