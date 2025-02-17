<?php
session_start(); // Iniciar sesión

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['id_cliente'])) {
    die("Error: Usuario no autenticado.");
}

// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "mysql", "tienda_teclados");

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener el ID del cliente desde la sesión
$id_cliente = $_SESSION['id_cliente'];

// Verificar si los productos fueron enviados correctamente
if (!isset($_POST['productos'])) {
    die("Error: Datos incompletos.");
}

// Obtener datos del formulario
$productos = json_decode($_POST['productos'], true); // Convertir JSON a array

if (empty($productos)) {
    die("Error: No hay productos en la compra.");
}

// Insertar la compra
$sqlCompra = "INSERT INTO compras (id_cliente) VALUES ('$id_cliente')";
if (!$conexion->query($sqlCompra)) {
    die("Error al registrar la compra: " . $conexion->error);
}
$id_compra = $conexion->insert_id; // Obtener el ID de la compra recién creada

// Insertar cada producto en detalle_compra
foreach ($productos as $producto) {
    if (!isset($producto['id_teclado'], $producto['cantidad'], $producto['precio'])) {
        continue; // Saltar si faltan datos
    }

    $id_teclado = intval($producto['id_teclado']);
    $cantidad = intval($producto['cantidad']);
    $subtotal = floatval($producto['precio']) * $cantidad;

    $sqlDetalle = "INSERT INTO detalle_compra (id_compra, id_teclado, cantidad, subtotal)
                   VALUES ('$id_compra', '$id_teclado', '$cantidad', '$subtotal')";
    
    if (!$conexion->query($sqlDetalle)) {
        die("Error al registrar el detalle de la compra: " . $conexion->error);
    }
}

// Cerrar conexión
$conexion->close();

// Redirigir al usuario con mensaje de éxito
header("Location: index.php?mensaje=compra_exitosa");
exit;
?>
