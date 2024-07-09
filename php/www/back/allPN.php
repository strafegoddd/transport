<?php
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $stmt = $pdo->prepare("SELECT * FROM part_number");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}