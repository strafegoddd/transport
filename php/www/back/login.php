<?php
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'tartar2002';

$dsn = 'mysql:host=my_db;dbname=loan_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);

$login = $_POST['login'];
$password = $_POST['password'];

if($ans = $pdo->query("SELECT * FROM `users`")){
    foreach($ans as $row){
        if ($login == $row['login'] && $password == $row['password']){
            echo 'success';
        }
//        else {
//            // Если аутентификация неудачна, возвращаем сообщение об ошибке
//            echo 'error';}
    }
}
