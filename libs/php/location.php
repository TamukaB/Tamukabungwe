<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['locid'];
    $city = $_REQUEST['city'];

    include_once("../includes/db.php");
    if ($id != 0) {
        try {
            $sql = "UPDATE location SET name='$city' WHERE id=$id";
            echo $sql;
            mysqli_query($db_config, $sql);
            header('Location: ../../index.html?active=location');
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else {
        try {
            $sql = "INSERT INTO location(name) VALUES ('$city')";
            mysqli_query($db_config, $sql);
            header('Location: ../../index.html?active=location');
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
?>