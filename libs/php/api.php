<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $api_type = $_POST['API_TYPE'];

    include_once("../includes/db.php");

    if ($api_type == 1) {
        try {
            $sql = "select p.*, d.name as department, l.name as location from personnel p inner join department d on p.departmentID = d.id inner join location l on d.locationID = l.id";
            $result = mysqli_query($db_config, $sql);
            if ($result) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                echo json_encode($data);
            } else {
                echo json_encode(array('message' => 'No data found'));
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else if ($api_type == 2) {
        try {
            $sql = "select * from location";
            $result = mysqli_query($db_config, $sql);
            if ($result) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                echo json_encode($data);
            } else {
                echo json_encode(array('message' => 'No data found'));
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    } else if ($api_type == 3) {
        try {
            $sql = "select d.id, d.name as department, l.name as location from department d inner join location l on d.locationID = l.id";
            $result = mysqli_query($db_config, $sql);
            if ($result) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                echo json_encode($data);
            } else {
                echo json_encode(array('message' => 'No data found'));
            }
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
