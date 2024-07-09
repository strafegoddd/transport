<?php
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
