<?php
function calculateEfficiencyIndicator($pdo, $vehicle_id, $ei_name, $date_start, $date_end) {
    $response = ['success' => false];
    $stmt_ei = $pdo->prepare("SELECT ei_id FROM efficiency_indicator WHERE ei_name = :ei_name");
    
    $stmt_ei->execute([':ei_name' => $ei_name]);
    $efficiency_indicator = $stmt_ei->fetch();

    if (!$efficiency_indicator) {
        throw new Exception("Efficiency Indicator not found");
    }

    $ei_id = $efficiency_indicator['ei_id'];
    
    //Получение аргументов для формулы из ei_arguments
    $stmt_args = $pdo->prepare("
        SELECT eia.indicator_id, ind.indicator_name 
        FROM ei_arguments eia 
        JOIN indicator ind ON eia.indicator_id = ind.indicator_id 
        WHERE eia.ei_id = :ei_id
    ");
    $stmt_args->execute([':ei_id' => $ei_id]);
    $indicators = $stmt_args->fetchAll();
   
    $indicatorValues = [];
    foreach ($indicators as $indicator) {
        $stmt = $pdo->prepare("
            SELECT SUM(viv_value) as total_value
            FROM vehicle_indicator_value 
            WHERE viv_vehicle_id = ? AND viv_indicator_id = ? AND viv_date BETWEEN ? AND ?
        ");
        $stmt->execute([$vehicle_id, $indicator['indicator_id'], $date_start, $date_end]);
        $value = $stmt->fetch();
        $indicatorValues[$indicator['indicator_name']] = $value['total_value'];
    }

    $res = 0.0;
    //Rasschet
    if ($ei_name == 'Показатель эффективности работы ТС'){
        if (isset($indicatorValues['Фактическая работа']) && isset($indicatorValues['Возможная работа'])) {
            $res = (float)($indicatorValues['Фактическая работа'] / $indicatorValues['Возможная работа']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Коэффициент использования пробега'){
        if (isset($indicatorValues['Пробег с грузом']) && isset($indicatorValues['Пробег'])) {
            $res = (float)($indicatorValues['Пробег с грузом'] / $indicatorValues['Пробег']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Статический коэффициент использования грузоподъемности'){
        if (isset($indicatorValues['Масса перевезенного груза']) && isset($indicatorValues['Грузоподъемность'])) {
            $res = (float)($indicatorValues['Масса перевезенного груза'] / $indicatorValues['Грузоподъемность']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Статический коэффициент использования грузовместимости'){
        if (isset($indicatorValues['Объем перевезенного груза']) && isset($indicatorValues['Грузовместимость'])) {
            $res = (float)($indicatorValues['Объем перевезенного груза'] / $indicatorValues['Грузовместимость']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Динамический коэффициент использования грузоподъемности'){
        if (isset($indicatorValues['Фактическая работа в тонно-километрах']) && isset($indicatorValues['Возможная работа в тонно-километрах'])) {
            $res = (float)($indicatorValues['Фактическая работа в тонно-километрах'] / $indicatorValues['Возможная работа в тонно-километрах']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Средняя дальность рейсов'){
        if (isset($indicatorValues['Пробег'])) {
            $stmt = $pdo->prepare("
                SELECT COUNT(*) as count
                FROM vehicle_indicator_value viv
                JOIN indicator ind ON viv.viv_indicator_id = ind.indicator_id
                WHERE viv.viv_vehicle_id = :vehicle_id AND ind.indicator_name = 'Пробег'
            ");
            $stmt->execute([':vehicle_id' => $vehicle_id]);
            $count = $stmt->fetchColumn();
            $res = (float)($indicatorValues ['Пробег'] / $count);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Расход топлива в час'){
        if (isset($indicatorValues['Расход топлива']) && isset($indicatorValues['Время в движении'])) {
            $res = (float)($indicatorValues['Расход топлива'] / $indicatorValues['Время в движении']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    } else if ($ei_name == 'Средняя скорость'){
        if (isset($indicatorValues['Пробег']) && isset($indicatorValues['Время в движении'])) {
            $res = (float)($indicatorValues['Пробег'] / $indicatorValues['Время в движении']);
        } else {
            throw new Exception("Required indicators for calculation not found");
        }
    }

    $stmt = $pdo->prepare("
        INSERT INTO vehicle_ei_value (vev_vehicle_id, vev_ei_id, vev_value, vev_date_start, vev_date_end)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$vehicle_id, $ei_id, $res, $date_start, $date_end]);
    $response = ['success' => true];
    return $response;
}