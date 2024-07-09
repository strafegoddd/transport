<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['vehicleID']) && isset($data['vehicleType']) && isset($data['garageId'])){
    $vehicleID = $data['vehicleID'];
    $vehicleType = $data['vehicleType'];
    $vehicleSubType = $data['vehicleSubType'];
    $vehicleSerial = $data['vehicleSerial'];
    $garageId = (int)$data['garageId'];

    $query = "SELECT vehicle_name FROM vehicle WHERE vehicle_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$vehicleID]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    $vehicleName = $res['vehicle_name'];

    $query = "INSERT INTO vehicle (vehicle_name, vehicle_type, vehicle_subtype, vehicle_serial_number) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$vehicleName, $vehicleType, $vehicleSubType, $vehicleSerial]);
    $vehicleId = $pdo->lastInsertId();  

    $query = "INSERT INTO vehicle_in_garage (vig_garage_id, vig_vehicle_id, vig_reg_time) VALUES (?, ?, NOW())";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$garageId, $vehicleId]);

    echo json_encode(['success' => true, 'vehicle_id' => $vehicleId]);
}
else{
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}