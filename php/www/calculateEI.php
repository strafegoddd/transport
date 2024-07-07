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

// Подключаем файл с функцией
include 'functions.php';

if (!empty($data)) {
    try {
        foreach ($data as $entry) {
            $test = calculateEfficiencyIndicator(
                $pdo, 
                $entry['vehId'], 
                $entry['name'], 
                $entry['startDate'], 
                $entry['endDate']
            );
        }
    } catch (Exception $e) {
        $test['error'] = $e->getMessage();
    }
}

echo json_encode($test);
