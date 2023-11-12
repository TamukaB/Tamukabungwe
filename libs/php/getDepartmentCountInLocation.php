<?php

// Include your database connection code here
include_once("../includes/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['locationId'])) {
        $locationId = mysqli_real_escape_string($connection, $_POST['locationId']); // Sanitize the input

        // Perform a SQL query to count departments in the specified location
        $query = "SELECT COUNT(id) AS departmentCount FROM departments WHERE location_id = $locationId";

        $result = mysqli_query($connection, $query);

        if ($result) {
            $row = mysqli_fetch_assoc($result);
            echo $row['departmentCount'];
        } else {
            echo 'Error: Unable to fetch department count.';
        }
    } else {
        echo 'Error: Missing locationId parameter.';
    }
}
?>
