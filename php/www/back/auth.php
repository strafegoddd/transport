<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Обработка preflight-запросов
    exit(0);
}
session_start();
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT u.user_id, u.user_login, u.user_password, u.user_role, u.user_name, (SELECT pn.part_number_value FROM part_number pn WHERE pn.part_number_id = u.part_number_id) AS user_pn FROM users u WHERE user_login = :username");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && ($password == $user['user_password'])) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['user_login'] = $user['user_login'];
        $_SESSION['user_role'] = $user['user_role'];
        echo json_encode([
            'success' => true,
            'user_role' => $user['user_role'],
            'part_number' => $user['user_pn']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Неправильный логин или пароль.'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка базы данных: ' . $e->getMessage()
    ]);
}

$pdo = null;
