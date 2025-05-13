# Full CRUD API using PDO + error handling

<?php
header('Content-Type: application/json');
include('db.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        isset($_GET['id']) ? getEvent($_GET['id']) : getEvents();
        break;
    case 'POST':
        createEvent();
        break;
    case 'PUT':
        parse_str(file_get_contents("php://input"), $_PUT);
        isset($_GET['id']) ? updateEvent($_GET['id'], $_PUT) :
        response(400, 'Missing ID for update');
        break;
    case 'DELETE':
        isset($_GET['id']) ? deleteEvent($_GET['id']) :
        response(400, 'Missing ID for delete');
        break;
    default:
        response(405, 'Unsupported HTTP method');
}

function response($code, $message) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

# GET /api.php — List & search events (with pagination)

function getEvents() {
    global $pdo;
    $search = $_GET['search'] ?? '';
    $limit = $_GET['limit'] ?? 10;
    $page = $_GET['page'] ?? 1;
    $offset = ($page - 1) * $limit;

    try {
        $stmt = $pdo->prepare("SELECT * FROM events WHERE title LIKE :search OR description LIKE :search LIMIT :limit OFFSET :offset");
        $stmt->bindValue(':search', "%$search%");
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (PDOException $e) {
        response(500, $e->getMessage());
    }
}

# GET /api.php?id=3 — Get single event

function getEvent($id) {
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$id]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        $event ? print json_encode($event) :
        response(404, 'Event not found');
    } catch (PDOException $e) {
        response(500, $e->getMessage());
    }
}

# POST /api.php — Create new event

function createEvent() {
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['title'], $data['description'], $data['event_date'], $data['location'])) {
        response(400, 'Missing required fields');
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO events (title, description, event_date, location) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['description'], $data['event_date'], $data['location']]);
        http_response_code(201);
        echo json_encode(['message' => 'Event created']);
    } catch (PDOException $e) {
        response(500, $e->getMessage());
    }
}

# PUT /api.php?id=3 — Update event

function updateEvent($id, $data) {
    global $pdo;
    # Input validation:
    if (!isset($data['title'], $data['description'], $data['event_date'], $data['location'])) {
        response(400, 'Missing required fields');
    }

    try {
        # Prepared statements:
        $stmt = $pdo->prepare("UPDATE events SET title = ?, description = ?, event_date = ?, location = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['description'], $data['event_date'], $data['location'], $id]);
        echo json_encode(['message' => 'Event updated']);
    } catch (PDOException $e) {
        response(500, $e->getMessage());
    }
}
# DELETE /api.php?id=3 — Delete event

function deleteEvent($id) {
    global $pdo;
    try {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Event deleted']);
    } catch (PDOException $e) {
        response(500, $e->getMessage());
    }
}