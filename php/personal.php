<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect value of input field
    $id = $_REQUEST['perid'];
    $fname = $_REQUEST['fname'];
    $lname = $_REQUEST['lname'];
    $dep = $_REQUEST['department'];
    $loc = $_REQUEST['location'];
    $email = $_REQUEST['email'];
    include_once("../includes/db.php");

 if($id!=0){
    try {
        $sql = "UPDATE tbl_personaldata SET Fname='$fname', Lname='$lname',Department='$dep',Location='$loc',Email='$email' WHERE Id=$id";
        mysqli_query($db_config, $sql);
        header('Location: ../index.php');
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
 }
 else{
    try {
        $sql = "INSERT INTO tbl_personaldata(Fname, Lname,Department,Location,Email) VALUES ('$fname', '$lname','$dep','$loc','$email')";
        mysqli_query($db_config, $sql);
        header('Location: ../index.php');
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
}
