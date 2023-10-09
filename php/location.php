<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['locid'];
    $city = $_REQUEST['city'];

    include_once("../includes/db.php");
    if ($id != 0) {
        try {
            $sql = "UPDATE tbl_location SET City='$city' WHERE Id=$id";
            echo $sql;
            mysqli_query($db_config, $sql);
            header('Location: ../index.php');
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else {
        try {
            $sql = "INSERT INTO tbl_location(City) VALUES ('$city')";
            mysqli_query($db_config, $sql);
            header('Location: ../index.php');
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
?>