<?php

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }

// header("Access-Control-Allow-Origin: *");
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

// Получение данных из POST-запроса
//$data = json_decode(file_get_contents('php://input'), true);

$userName = $_POST['user-name'];
$userRole = $_POST['user-role'];
$userLogin = $_POST['user-login'];
$userPassword = $_POST['user-password'];
$userPart = $_POST['user-part'];

// Проверка, существует ли номер части
$partNumberId = null;
if (!empty($userPart)) {
    $stmt = $pdo->prepare('SELECT part_number_id FROM part_number WHERE part_number_value = ?');
    $stmt->execute([$userPart]);
    $partNumber = $stmt->fetch();

    if ($partNumber) {
        $partNumberId = $partNumber['part_number_id'];
    } else {
        // Вставка нового номера части, если его нет в базе данных
        $stmt = $pdo->prepare('INSERT INTO part_number (part_number_value) VALUES (?)');
        $stmt->execute([$userPart]);
        $partNumberId = $pdo->lastInsertId();
    }
}

try {
    // Вставка нового пользователя в базу данных
    $stmt = $pdo->prepare('INSERT INTO users (user_login, user_password, user_role, user_name, part_number_id) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$userLogin, $userPassword, $userRole, $userName, $partNumberId]);

    echo json_encode(['success' => true, 'message' => 'User added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to add user: ' . $e->getMessage()]);
}
