<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['pdelid'];
    include_once("../includes/db.php");
    try {
        $sql = "DELETE FROM tbl_personaldata WHERE Id=$id";
        mysqli_query($db_config, $sql);
        header('Location: ../index.php');
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
?>