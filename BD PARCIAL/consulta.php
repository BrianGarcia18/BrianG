<?php
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "tienda_teclados";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id_producto, nombre, marca, tipo, precio, stock FROM productos";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Teclados</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <h1>Lista de Teclados Disponibles</h1>

    <?php
    if ($result->num_rows > 0) {
        echo "<table border='1'>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Stock</th>
                </tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>" . $row["id_producto"] . "</td>
                    <td>" . $row["nombre"] . "</td>
                    <td>" . $row["marca"] . "</td>
                    <td>" . $row["tipo"] . "</td>
                    <td>" . $row["precio"] . "</td>
                    <td>" . $row["stock"] . "</td>
                  </tr>";
        }
        echo "</table>";
    } else {
        echo "No hay teclados disponibles.";
    }

    $conn->close();
    ?>

    <div class="button-container">
        <button onclick="window.history.back();">VOLVER</button>
    </div>

</body>
</html>


