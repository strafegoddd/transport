<?php
session_start();
header("Access-Control-Allow-Origin: *");
$response = [
    'logged_in' => false
];

if (isset($_SESSION['login'])) {
    $response['logged_in'] = true;
    $response['login'] = $_SESSION['username'];
}

header('Content-Type: application/json');
echo json_encode($response);
