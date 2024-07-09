<?php
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try{
    $stmt = $pdo->prepare("SELECT 
            u.user_id, 
            u.user_login, 
            u.user_password, 
            u.user_role,
            u.user_name,
            (SELECT pn.part_number_value FROM part_number pn WHERE pn.part_number_id = u.part_number_id) AS user_pn
        FROM users u");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}
catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}