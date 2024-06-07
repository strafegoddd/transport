<?php
header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $garage_name = $_POST['garage-name'];
    $address = $_POST['address'];
    $number = $_POST['number'];
    $square = $_POST['square'];
    $stmt = $pdo->prepare("INSERT INTO garage (garage_name, garage_address, garage_part_number, garage_square) VALUES (:garage_name, :address, :garage_part_number, :garage_square)");
    $stmt->bindParam(':garage_name', $garage_name);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':garage_part_number', $number);
    $stmt->bindParam(':garage_square', $square);
    $stmt->execute();
    echo json_encode([
        'success' => true
    ]);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}