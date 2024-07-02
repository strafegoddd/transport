<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
include_once 'conf.php'; // Подключение к базе данных

$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $vehicleId = $data['id'][0];

    try {
        // Получение всех индикаторов и их значений для указанного транспортного средства
        $stmt = $pdo->prepare("
            SELECT
                i.indicator_id,
                i.indicator_name,
                i.indicator_unit,
                i.indicator_type,
                viv.viv_value,
                viv.viv_date,
                g.garage_name
            FROM
                vehicle_indicator_value viv
            INNER JOIN
                indicator i ON viv.viv_indicator_id = i.indicator_id
            INNER JOIN
                vehicle_in_garage vig ON viv.viv_vehicle_id = vig.vig_vehicle_id
            INNER JOIN
                garage g ON vig.vig_garage_id = g.garage_id
            WHERE
                viv.viv_vehicle_id = :vehicle_id
        ");
        $stmt->bindParam(':vehicle_id', $vehicleId, PDO::PARAM_INT);
        $stmt->execute();

        $indicators = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($indicators);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Ошибка базы данных: ' . $e->getMessage()]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Произошла ошибка: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Отсутствует идентификатор транспортного средства.']);
}

$pdo = null;
