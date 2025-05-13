<?php
header("Content-Type: application/json");

$host = 'localhost';
$db = 'campus_hub';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
}

$action = $_GET['action'] ?? '';

if ($action === 'get_reviews') {
    $stmt = $pdo->query("SELECT * FROM course_reviews ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll());
    exit;
}

if ($action === 'add_review' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['course'], $data['instructor'], $data['department'], $data['rating'], $data['review'])) {
        echo json_encode(['success' => false, 'error' => 'Missing data']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO course_reviews (course, instructor, department, rating, review, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->execute([
        $data['course'],
        $data['instructor'],
        $data['department'],
        $data['rating'],
        $data['review']
    ]);
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['error' => 'Invalid action']);

