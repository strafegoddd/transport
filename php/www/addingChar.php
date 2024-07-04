<?php
error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

include_once 'conf.php'; // Подключение к базе данных
$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

$valuesToInsert = [];

    // Перебираем полученные данные и формируем строки для вставки
    foreach ($data as $item) {
        $name = $item['name'];
        $value = $item['value'];
        $vehId = $item['vehId'];
        
        // Подготавливаем SQL запрос с использованием подготовленных выражений
        $stmt = $pdo->prepare("INSERT INTO vehicle_indicator_value (viv_vehicle_id, viv_indicator_id, viv_value, viv_date) 
                                VALUES (:vehId, (SELECT indicator_id FROM indicator WHERE indicator_name = :name), :value, CURDATE())");
        
        // Привязываем параметры к подготовленному выражению
        $stmt->bindParam(':vehId', $vehId);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':value', $value);
        // Выполняем запрос
        $stmt->execute();

        // Добавляем информацию о вставленных строках для возможного вывода пользователю
        //$valuesToInsert[] = $stmt->rowCount();
    }

    // Отправляем успешный ответ в формате JSON
    echo json_encode(["success" => true]);

// Закрываем соединение с базой данных
$pdo = null;
