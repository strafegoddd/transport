<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

include_once 'conf.php'; // Подключение к базе данных
$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

if (is_array($data)) {
    try {
        foreach ($data as $indicator) {
            $stmt_select = $pdo->prepare("SELECT indicator_id FROM indicator WHERE indicator_name = :name");
            $stmt_select->bindParam(':name', $indicator['name']);
            $stmt_select->execute();
            $result = $stmt_select->fetch(PDO::FETCH_ASSOC);
            // echo json_encode($result);

            if ($result) {
                $indicator_id = $result['indicator_id'];
                $veh_id = $indicator['vehId'];
                $total_value = $indicator['value'];
                $start_date = new DateTime($indicator['startDate']);
                $end_date = new DateTime($indicator['endDate']);
                $interval = $start_date->diff($end_date)->days;
                $average_value = (float) $total_value / ($interval + 1);

                for ($i = 0; $i <= $interval; $i++) {
                    $current_date = (clone $start_date)->modify("+$i day")->format('Y-m-d');
                    $stmt_insert = $pdo->prepare("INSERT INTO vehicle_indicator_value (viv_vehicle_id, viv_indicator_id, viv_value, viv_date) VALUES (:veh_id, :indicator_id, :value, :date)");
                    $stmt_insert->bindParam(':veh_id', $veh_id);
                    $stmt_insert->bindParam(':indicator_id', $indicator_id);
                    $stmt_insert->bindParam(':value', $average_value);
                    $stmt_insert->bindParam(':date', $current_date);
                    $stmt_insert->execute();
                }
            }
        }

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}
$pdo = null;
