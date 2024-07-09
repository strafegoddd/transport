<?php
if (isset($_GET['type_id'])) {
    // Подключение к базе данных
    include_once 'conf.php';

    $database = new Database();
    $pdo = $database->getConnection();
    
    // Запрос на получение подтипов транспорта для заданного типа
    $typeId = $_GET['type_id'];
    $query = "SELECT subtype_id, subtype_name FROM vehicle_subtype WHERE type_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$typeId]);
    $subtypes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Возвращаем JSON с подтипами транспорта
    header('Content-Type: application/json');
    echo json_encode($subtypes);
} else {
    http_response_code(400);
    echo "Ошибка: Не указан type_id";
}
