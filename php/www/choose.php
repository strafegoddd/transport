<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $garageId = $data['id'][0];
    $query = "SELECT 
        v.vehicle_id, 
        v.vehicle_name, 
        v.vehicle_subtype,
        v.vehicle_serial_number,
        vt.type_name
    FROM vehicle v
    JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
    JOIN vehicle_type vt ON v.vehicle_type = vt.type_id
    WHERE vig.vig_garage_id = ?";

    $stmt = $pdo->prepare($query);
    $stmt->execute([$garageId]);
    $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($vehicles);
}
else{
    echo json_encode(['error' => 'Invalid garage ID']);
}


$pdo = null;