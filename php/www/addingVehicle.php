<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['vehicleName']) && isset($data['vehicleType']) && isset($data['garageId'])){
    $vehicleName = $data['vehicleName'];
    $vehicleType = $data['vehicleType'];
    $garageId = (int)$data['garageId'];

    $query = "SELECT type_id FROM vehicle_type WHERE type_name = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$vehicleType]);
    $type = $stmt->fetch(PDO::FETCH_ASSOC);
    $typeId = $type['type_id'];

    $query = "INSERT INTO vehicle (vehicle_name, vehicle_type) VALUES (?, ?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$vehicleName, $typeId]);
    $vehicleId = $pdo->lastInsertId();

    $query = "INSERT INTO vehicle_in_garage (vig_garage_id, vig_vehicle_id, vig_reg_time) VALUES (?, ?, NOW())";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$garageId, $vehicleId]);

    echo json_encode(['success' => true, 'vehicle_id' => $vehicleId]);
    //echo json_encode($garageId);
}
else{
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}