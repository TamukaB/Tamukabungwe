<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['Ddelid'];
    include_once("../includes/db.php");
    try {
        $sql = "DELETE FROM department WHERE Id=$id";
        mysqli_query($db_config, $sql);
        header('Location: ../../index.html?active=department');
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
?>