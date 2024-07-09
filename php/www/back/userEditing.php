<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Если это preflight-запрос, просто возвращаем успешный статус
}

include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$editData = $data['editData'];

$userName = $editData['edit-user-name'];
$userRole = $editData['edit-user-role'];
$userLogin = $editData['edit-user-login'];
$userPassword = $editData['edit-user-password'];
$userPart = $editData['edit-user-part'];

//echo json_encode($id);

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
    
    if ($userPassword) {
        $stmt = $pdo->prepare('UPDATE users SET user_login = ?, user_password = ?, user_role = ?, user_name = ?, part_number_id = ? WHERE user_id = ?');
        $stmt->execute([$userLogin, $userPassword, $userRole, $userName, $partNumberId, $id]);
    } else {
        $stmt = $pdo->prepare('UPDATE users SET user_login = ?, user_role = ?, user_name = ?, part_number_id = ? WHERE user_id = ?');
        $stmt->execute([$userLogin, $userRole, $userName, $partNumberId, $id]);
    }

    echo json_encode(['success' => true, 'message' => 'User updated successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to update user: ' . $e->getMessage()]);
}

$pdo = null;