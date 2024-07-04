<?php
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
        $charValue = $editData['edit-char-value'];

        // Обновление транспортного средства
        $stmt = $pdo->prepare("UPDATE vehicle_indicator_value SET viv_value = :viv_value WHERE viv_indicator_id = :viv_indicator_id");
        $stmt->bindParam(':viv_value', $charValue, PDO::PARAM_STR);
        $stmt->bindParam(':viv_indicator_id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'error' => 'Не удалось обновить данные характеристики.']);
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