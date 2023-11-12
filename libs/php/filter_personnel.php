<?php
// Include your database connection code here
include_once("../includes/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $selectedDepartmentId = $_POST['departmentId'];
    $selectedLocationId = $_POST['locationId'];
    // $filterCriteria = $_POST['filter'];

    // Create the SQL query based on selected filters and criteria
    $query = "SELECT p.*, d.name as department, l.name as location FROM personnel p INNER JOIN department d ON p.departmentID = d.id INNER JOIN location l ON d.locationID = l.id WHERE 1 = 1 "; // Starting with a basic query

    if (!empty($selectedDepartmentId)) {
        $query .= " AND d.id = $selectedDepartmentId";
    }

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
