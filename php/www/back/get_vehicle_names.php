<?php
if (isset($_GET['subtype_id'])) {
    // Подключение к базе данных
    include_once 'conf.php';

    $database = new Database();
    $pdo = $database->getConnection();
    
    // Запрос на получение названий транспорта для заданного подтипа
    $subtypeId = $_GET['subtype_id'];
    $query = "SELECT vehicle_id, vehicle_name FROM vehicle WHERE vehicle_subtype = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$subtypeId]);
    $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Возвращаем JSON с названиями транспорта
    header('Content-Type: application/json');
    echo json_encode($vehicles);
} else {
    http_response_code(400);
    echo "Ошибка: Не указан subtype_id";
}
