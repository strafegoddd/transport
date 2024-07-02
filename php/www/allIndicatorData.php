<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
include_once 'conf.php'; // Подключение к базе данных

$database = new Database();
$pdo = $database->getConnection();  

try {
    // Получение всех индикаторов и их значений для указанного транспортного средства
    $stmt = $pdo->prepare("SELECT * FROM indicator");
    $stmt->execute();

    $indicators = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($indicators);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Ошибка базы данных: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Произошла ошибка: ' . $e->getMessage()]);
}

$pdo = null;
