<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
// CONFIGURACIÓN DE BASE DE DATOS
$host = "localhost";
$user = "root"; 
$pass = ""; // En WampServer por defecto es vacío
$db   = "akcondor_db";

$conn = new mysqli($host, $user, $pass, $db);

// Crear base de datos y tabla si no existen (Autoinstalable)
$conn->query("CREATE DATABASE IF NOT EXISTS $db");
$conn->select_db($db);
$conn->query("CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255)
)");

session_start();
header('Content-Type: application/json');

$action = $_POST['action'] ?? '';

if ($action == 'register') {
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $email = $conn->real_escape_string($_POST['email']);
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO usuarios (nombre, email, password_hash) VALUES ('$nombre', '$email', '$pass')";
    if ($conn->query($sql)) {
        echo json_encode(['status' => 'success', 'user_name' => $nombre]);
    } else {
        echo json_encode(['status' => 'error', 'msg' => 'El correo ya existe']);
    }
}

if ($action == 'login') {
    $email = $conn->real_escape_string($_POST['email']);
    $pass = $_POST['password'];

    $res = $conn->query("SELECT nombre, password_hash FROM usuarios WHERE email = '$email'");
    if ($user = $res->fetch_assoc()) {
        if (password_verify($pass, $user['password_hash'])) {
            echo json_encode(['status' => 'success', 'user_name' => $user['nombre']]);
        } else {
            echo json_encode(['status' => 'error', 'msg' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['status' => 'error', 'msg' => 'Usuario no encontrado']);
    }
}
$conn->close();
?>
