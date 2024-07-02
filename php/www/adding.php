<?php
error_reporting(0);
ini_set('display_errors', 0);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
   exit();
}

// header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $garage_name = $_POST['garage-name'];
    $address = $_POST['address'];
    $number = $_POST['number'];
    $square = $_POST['square'];
    $owner = $_POST['owner'];
    $phone = $_POST['phone'];
    $stmt = $pdo->prepare("INSERT INTO garage (garage_name, garage_address, garage_part_number, garage_square, garage_owner, garage_phone) VALUES (:garage_name, :address, :garage_part_number, :garage_square, :garage_owner, :garage_phone)");
    $stmt->bindParam(':garage_name', $garage_name);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':garage_part_number', $number);
    $stmt->bindParam(':garage_square', $square);
    $stmt->bindParam(':garage_owner', $owner);
    $stmt->bindParam(':garage_phone', $phone);
    $stmt->execute();
    echo json_encode([
        'success' => true
    ]);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}