<?php
error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try {
    // Получаем данные из POST-запроса
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data[0]['id']) && isset($data[0]['name'])) {
        $id = $data[0]['id'];
        $garageName = $data[0]['name'];
        // Обновление данных в таблице garage
        $stmt = $pdo->prepare("SELECT garage_id FROM garage WHERE garage_name = :garage_name");
        $stmt->bindParam(':garage_name', $garageName, PDO::PARAM_STR);
        $stmt->execute();
        $garageId = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $stmt = $pdo->prepare("UPDATE vehicle_in_garage SET vig_garage_id = :vig_garage_id WHERE vig_vehicle_id = :vehicle_id");
        $stmt->bindParam(':vig_garage_id', $garageId['garage_id'], PDO::PARAM_STR);
        $stmt->bindParam(':vehicle_id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'error' => 'Не удалось обновить данные транспортного средства.']);
        }

    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
    }
} catch(PDOException $e) {
    // Возвращаем ошибку в случае неудачи
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}

// Закрываем соединение
$pdo = null;
