<?php
// Подключение к базе данных
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

// Запрос на получение всех типов транспорта
$query = "SELECT type_id, type_name FROM vehicle_type";
$stmt = $pdo->prepare($query);
$stmt->execute();
$types = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Возвращаем JSON с типами транспорта
header('Content-Type: application/json');
echo json_encode($types);