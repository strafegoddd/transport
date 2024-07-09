<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Если это preflight-запрос, просто возвращаем успешный статус
}

include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try {
    // Получаем данные из POST-запроса
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id']) && isset($data['editData'])) {
        $id = $data['id'];
        $editData = $data['editData'];

        // Извлечение данных из FormData
        $vehicleName = $editData['vehicle-name-edit'];
        $vehicleTypeName = $editData['vehicle-type-edit'];

        // Обновление данных в таблице garage
        $stmt = $pdo->prepare("SELECT type_id FROM vehicle_type WHERE type_name = :type_name");
        $stmt->bindParam(':type_name', $vehicleTypeName, PDO::PARAM_STR);
        $stmt->execute();
        $type = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($type) {
            // Тип транспортного средства найден
            $vehicleTypeId = $type['type_id'];
        } else {
            // Тип транспортного средства не найден, вставляем новый тип
            echo json_encode(['success' => false, 'error' => 'Такого типа не существует']);
        }

        // Обновление транспортного средства
        $stmt = $pdo->prepare("UPDATE vehicle SET vehicle_name = :vehicle_name, vehicle_type = :vehicle_type WHERE vehicle_id = :vehicle_id");
        $stmt->bindParam(':vehicle_name', $vehicleName, PDO::PARAM_STR);
        $stmt->bindParam(':vehicle_type', $vehicleTypeId, PDO::PARAM_INT);
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
