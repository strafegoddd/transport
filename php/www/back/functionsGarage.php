<?php
function calculateEfficiencyGarageIndicator($pdo, $garageID) {
    $response = ['success' => false];

    //sostoyanie
    $sql = "SELECT COUNT(DISTINCT v.vehicle_id) AS ready_vehicles_count
            FROM vehicle v
            JOIN vehicle_indicator_value viv ON v.vehicle_id = viv.viv_vehicle_id
            JOIN indicator i ON viv.viv_indicator_id = i.indicator_id
            JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
            JOIN garage g ON vig.vig_garage_id = g.garage_id
            WHERE i.indicator_name = 'Состояние' AND viv.viv_value = 1 AND g.garage_id = :garage_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['garage_id' => $garageID]);
    $result = $stmt->fetch();
    
    $readyVehiclesCount = $result['ready_vehicles_count'];

    //count
    $sql = "SELECT COUNT(DISTINCT v.vehicle_id) AS total_vehicles_count
            FROM vehicle v
            JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
            JOIN garage g ON vig.vig_garage_id = g.garage_id
            WHERE g.garage_id = :garage_id;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['garage_id' => $garageID]);
    $result = $stmt->fetch();
    
    $totalCountVeh = $result['total_vehicles_count'];

    //now in usage
    $sql = "SELECT COUNT(DISTINCT v.vehicle_id) AS vehicles_with_indicator_count
        FROM vehicle v
        JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
        JOIN vehicle_indicator_value viv ON v.vehicle_id = viv.viv_vehicle_id
        JOIN indicator i ON viv.viv_indicator_id = i.indicator_id
        WHERE i.indicator_type = 'Показатель' AND vig.vig_garage_id = :garage_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['garage_id' => $garageID]);
    $result = $stmt->fetch();
    
    $vehiclesWithIndicatorCount = $result['vehicles_with_indicator_count'];
    
    //Fact Work SUM
    $sql = "SELECT SUM(viv.viv_value) AS total_fact_work
        FROM vehicle v
        JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
        JOIN vehicle_indicator_value viv ON v.vehicle_id = viv.viv_vehicle_id
        JOIN indicator i ON viv.viv_indicator_id = i.indicator_id
        WHERE i.indicator_name = 'Фактическая работа' AND vig.vig_garage_id = :garage_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['garage_id' => $garageID]);
    $result = $stmt->fetch();
    
    $totalFactWork = $result['total_fact_work'] ?? 0;
    
    //Vozm Work SUM
    $sql = "SELECT SUM(viv.viv_value) AS total_prob_work
        FROM vehicle v
        JOIN vehicle_in_garage vig ON v.vehicle_id = vig.vig_vehicle_id
        JOIN vehicle_indicator_value viv ON v.vehicle_id = viv.viv_vehicle_id
        JOIN indicator i ON viv.viv_indicator_id = i.indicator_id
        WHERE i.indicator_name = 'Возможная работа' AND vig.vig_garage_id = :garage_id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['garage_id' => $garageID]);
    $result = $stmt->fetch();
    
    $totalProbWork = $result['total_prob_work'] ?? 0;

    $res1 = 0.0;
    $res2 = 0.0;
    $res3 = 0.0;
    //Rasschet
    if (isset($readyVehiclesCount) && isset($totalCountVeh) && ($totalCountVeh != 0)) {
        $res1 = (float)($readyVehiclesCount / $totalCountVeh);
    } else {
        throw new Exception("Required indicators for calculation not found");
    }

    if (isset($vehiclesWithIndicatorCount) && isset($totalCountVeh) && ($totalCountVeh != 0)) {
        $res2 = (float)($vehiclesWithIndicatorCount / $totalCountVeh);
    } else {
        throw new Exception("Required indicators for calculation not found");
    }

    if (isset($totalFactWork) && isset($totalProbWork) && ($totalProbWork != 0)) {
        $res3 = (float)($totalFactWork / $totalProbWork);
    } else {
        throw new Exception("Required indicators for calculation not found");
    }
    
    $answer = [$res1, $res2, $res3];
    // $stmt = $pdo->prepare("
    //     INSERT INTO garage_ei_value (gev_garage_id, gev_ei_id, gev_value)
    //     VALUES (?, ?, ?)
    // ");
    // $stmt->execute([$garageID, 9, $res1]);

    // $stmt = $pdo->prepare("
    //     INSERT INTO garage_ei_value (gev_garage_id, gev_ei_id, gev_value)
    //     VALUES (?, ?, ?)
    // ");
    // $stmt->execute([$garageID, 10, $res2]);

    // $stmt = $pdo->prepare("
    //     INSERT INTO garage_ei_value (gev_garage_id, gev_ei_id, gev_value)
    //     VALUES (?, ?, ?)
    // ");
    // $stmt->execute([$garageID, 11, $res3]);

    return $answer;
}
