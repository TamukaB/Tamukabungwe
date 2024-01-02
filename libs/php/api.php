<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $api_type = $_POST['API_TYPE'];

    include_once("../includes/db.php");

    if ($api_type == 2)
    {
        try {
            $sql = "select l.id, l.name, (SELECT COUNT(*) FROM department d WHERE d.locationID = l.id) AS deptCount from  location l order by l.name ASC";
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
