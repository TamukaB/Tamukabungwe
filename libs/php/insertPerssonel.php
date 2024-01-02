<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $id = $_REQUEST['perid'];
    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $dep = $_REQUEST['department'];
    $email = $_REQUEST['email'];
    include_once("../includes/db.php");

    if ($id > 0) {
        try {
            $sql = "UPDATE personnel SET firstName='$fname', lastName='$lname', email='$email', departmentID='$dep' WHERE Id=$id";
            mysqli_query($db_config, $sql);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else {
        try {
            $sql = "INSERT INTO personnel(firstName, lastName, email, departmentID) VALUES ('$fname','$lname','$email','$dep')";
            mysqli_query($db_config, $sql) or die(mysqli_error($db));
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
