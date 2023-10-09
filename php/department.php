<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['depid'];
    $name = $_REQUEST['name'];
    $loc = $_REQUEST['location'];
    include_once("../includes/db.php");
    if ($id != 0) {
        try {
            $sql = "UPDATE tbl_department SET Name='$name', Location='$loc' WHERE Id=$id";
            mysqli_query($db_config, $sql);
             header('Location: ../index.php');
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else {
        try {
            $sql = "INSERT INTO tbl_department(Name, Location) VALUES ('$name','$loc')";
            mysqli_query($db_config, $sql);
            header('Location: ../index.php');
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
?>