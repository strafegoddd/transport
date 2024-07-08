<?php
include_once 'conf.php'; // Подключение к базе данных

$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $garageId = $data['id'][0];

    try {
        // Получение всех индикаторов и их значений для указанного транспортного средства
        $stmt = $pdo->prepare("
            SELECT
                gev.gev_id,
                gev.gev_value,
                gev.gev_date_start,
                gev.gev_date_end,
                ei.ei_name,
                ei.ei_unit
            FROM
                garage_ei_value gev
            INNER JOIN
                efficiency_indicator ei ON gev.gev_ei_id = ei.ei_id
            WHERE
                gev.gev_garage_id = :garage_id
        ");
        $stmt->bindParam(':garage_id', $garageId, PDO::PARAM_INT);
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