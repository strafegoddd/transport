<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try {
    // Получаем данные из POST-запроса
    $data = json_decode(file_get_contents('php://input'), true);
    $ids = $data['ids'];

    if (!empty($ids)) {
        // SQL-запрос для удаления данных
        $in  = str_repeat('?,', count($ids) - 1) . '?';
        $stmt = $pdo->prepare("DELETE FROM vehicle_indicator_value WHERE viv_indicator_id IN ($in)");
        $stmt->execute($ids);
    }

    // Возвращаем результат в формате JSON
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$pdo = null;