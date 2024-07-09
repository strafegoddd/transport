<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $stmt = $pdo->prepare("SELECT 
            g.garage_id, 
            g.garage_name, 
            g.garage_address, 
            (SELECT pn.part_number_value FROM part_number pn WHERE pn.part_number_id = g.garage_part_number) AS garage_pn, 
            g.garage_square,
            g.garage_owner,
            g.garage_phone, 
            (SELECT COUNT(*) FROM vehicle_in_garage vig WHERE vig.vig_garage_id = g.garage_id) AS garage_space
        FROM garage g");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}