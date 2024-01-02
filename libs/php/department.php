<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['depid'];
    $name = $_REQUEST['name'];
    $loc = $_REQUEST['location'];
    include_once("../includes/db.php");
    if ($id != 0) {
        try {
            $sql = "UPDATE department SET name='$name', locationID='$loc' WHERE Id=$id";
            mysqli_query($db_config, $sql);
             echo json_encode(['success'=> true]);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else {
        try {
            $sql = "INSERT INTO department(name, locationID) VALUES ('$name','$loc')";
            mysqli_query($db_config, $sql);
            echo json_encode(['success'=> true]);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
?>