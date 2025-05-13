<?php
header("Content-Type: application/json");
require_once 'database.php';

// Basic routing
$method = $_SERVER['REQUEST_METHOD'];
$uri = explode("/", trim($_SERVER['REQUEST_URI'], "/"));
$endpoint = $uri[1] ?? '';

switch ($method) {
    case 'GET':
        if ($endpoint === 'items') listItems();
        break;
    case 'POST':
        if ($endpoint === 'items') createItem();
        break;
    case 'PUT':
        if ($endpoint === 'items' && isset($uri[2])) updateItem($uri[2]);
        break;
    case 'DELETE':
        if ($endpoint === 'items' && isset($uri[2])) deleteItem($uri[2]);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

function listItems() {
    $pdo = getPDO();
    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = 10;
    $offset = ($page - 1) * $limit;

    $stmt = $pdo->prepare("SELECT * FROM items LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

function createItem() {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['name']) || empty(trim($data['name']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Name is required']);
        return;
    }

    $name = htmlspecialchars($data['name']);
    $description = htmlspecialchars($data['description'] ?? '');

    $pdo = getPDO();
    $stmt = $pdo->prepare("INSERT INTO items (name, description) VALUES (?, ?)");
    $stmt->execute([$name, $description]);

    http_response_code(201);
    echo json_encode(['message' => 'Item created']);
}

function updateItem($id) {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = htmlspecialchars($data['name'] ?? '');
    $description = htmlspecialchars($data['description'] ?? '');

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Name is required']);
        return;
    }

    $pdo = getPDO();
    $stmt = $pdo->prepare("UPDATE items SET name = ?, description = ? WHERE id = ?");
    $stmt->execute([$name, $description, $id]);

    echo json_encode(['message' => 'Item updated']);
}

function deleteItem($id) {
    $pdo = getPDO();
    $stmt = $pdo->prepare("DELETE FROM items WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['message' => 'Item deleted']);
}
?>
