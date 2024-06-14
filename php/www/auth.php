<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
   exit();
}
header("Access-Control-Allow-Origin: *");
session_start();
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

try {

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $login = $_POST['login'];
        $pass = $_POST['password'];

        $sql = "SELECT * FROM users WHERE user_login = :login";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':login', $login);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($pass, $row['user_password'])) {
                $_SESSION['login'] = $login;
                echo json_encode(['status' => 'success', 'message' => 'Вход успешен']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Неправильный пароль']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Пользователь не найден']);
        }
    }
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
}

$pdo = null;
