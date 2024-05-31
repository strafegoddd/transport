<?php
header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $garage_name = $_POST['garage_name'];
    $address = $_POST['address'];
    $stmt = $pdo->prepare("INSERT INTO garage (garage_name, garage_address) VALUES (:garage_name, :address)");
    $stmt->bindParam(':garage_name', $garage_name);
    $stmt->bindParam(':address', $address);
    $stmt->execute();
    echo json_encode([
        'success' => true,
        'data' => [
            'garage_name' => $garage_name,
            'address' => $address
        ]
    ]);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}