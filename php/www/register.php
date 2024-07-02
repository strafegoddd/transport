<?php
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Content-Type");
//    exit();
// }
// header("Access-Control-Allow-Origin: *");
$user = 'root';
include_once 'conf.php';

$database = new Database();
$pdo = $database->getConnection();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST['login'];
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
    //$pass = $_POST['password'];
    $post = $_POST['post'];
    $sql = "INSERT INTO users (user_login, user_password, user_post) VALUES (:username, :password, :post)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $login);
    $stmt->bindParam(':password', $pass);
    $stmt->bindParam(':post', $post);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Регистрация успешна']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $stmt->errorInfo()[2]]);
    }
}
