<?php
header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $stmt = $pdo->prepare("SELECT 
            g.garage_id, 
            g.garage_name, 
            g.garage_address, 
            g.garage_part_number, 
            g.garage_square, 
            (SELECT COUNT(*) FROM vehicle_in_garage vig WHERE vig.vig_garage_id = g.garage_id) AS garage_space
        FROM garage g");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}