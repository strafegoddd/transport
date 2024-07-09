<?php

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
        v.vehicle_serial_number,
        vt.type_name,
        vst.subtype_name
    FROM vehicle v
    JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
    JOIN vehicle_type vt ON v.vehicle_type = vt.type_id
    JOIN vehicle_subtype vst ON v.vehicle_subtype = vst.subtype_id
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