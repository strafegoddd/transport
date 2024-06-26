<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
   exit();
}
header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $stmt = $pdo->prepare("SELECT 
        v.vehicle_id, 
        v.vehicle_name, 
        v.vehicle_subtype,
        v.vehicle_serial_number,
        vt.type_name
    FROM vehicle v
    JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
    JOIN vehicle_type vt ON v.vehicle_type = vt.type_id");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}