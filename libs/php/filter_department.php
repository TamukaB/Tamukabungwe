<?php
// Include your database connection code here
include_once("../includes/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $selectedLocationId = isset($_POST['locationId'])?$_POST['locationId']:'';

    // Create the SQL query based on selected filters and criteria
    $query = "SELECT d.name, l.name as location, 
    (SELECT COUNT(*) FROM personnel p where p.departmentID = d.id) as empCount
    FROM department d  INNER JOIN location l ON d.locationID = l.id WHERE 1 = 1 "; // Starting with a basic query

    if (!empty($selectedLocationId)) {
        $query .= " AND l.id = $selectedLocationId";
    }

    // Execute the SQL query
    $result = mysqli_query($db_config, $query);

    if ($result) {

        // Fetch the filtered data and return it as JSON
        $filteredData = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $filteredData[] = $row;
        }

        echo json_encode($filteredData);
    } else {
        echo 'Error: Unable to fetch filtered data.';
    }
}
?>
