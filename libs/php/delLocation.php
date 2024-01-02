<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['Ldelid'];
    include_once("../includes/db.php");
    try {
        $sql = "DELETE FROM location WHERE id=$id";
        mysqli_query($db_config, $sql);
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['data'] = [];
        echo json_encode($output);
		exit;
        // header('Location: ../../index.html?active=location');
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
?>