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
        $garageName = $editData['garage-name-edit'];
        $garageAddress = $editData['address-edit'];
        $garagePartNumber = $editData['number-edit'];
        $garageSquare = $editData['square-edit'];
        $garageOwner = $editData['owner-edit'];
        $garagePhone = $editData['phone-edit'];

        // Обновление данных в таблице garage
        $stmt = $pdo->prepare("UPDATE garage SET 
            garage_name = :garage_name,
            garage_address = :garage_address,
            garage_part_number = :garage_part_number,
            garage_square = :garage_square,
            garage_owner = :garage_owner,
            garage_phone = :garage_phone
            WHERE garage_id = :id");

        $stmt->bindParam(':garage_name', $garageName);
        $stmt->bindParam(':garage_address', $garageAddress);
        $stmt->bindParam(':garage_part_number', $garagePartNumber);
        $stmt->bindParam(':garage_square', $garageSquare);
        $stmt->bindParam(':garage_owner', $garageOwner);
        $stmt->bindParam(':garage_phone', $garagePhone);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update record']);
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
