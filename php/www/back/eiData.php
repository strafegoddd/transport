<?php
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
                vev.vev_id,
                vev.vev_value,
                vev.vev_date_start,
                vev.vev_date_end,
                ei.ei_name,
                ei.ei_unit
            FROM
                vehicle_ei_value vev
            INNER JOIN
                efficiency_indicator ei ON vev.vev_ei_id = ei.ei_id
            WHERE
                vev.vev_vehicle_id = :vehicle_id
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