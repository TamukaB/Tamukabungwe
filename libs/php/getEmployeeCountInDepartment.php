<?php
// Include your database connection code here
include_once("../includes/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['departmentId'])) {
        $departmentId = mysqli_real_escape_string($connection, $_POST['departmentId']); // Sanitize the input

        // Perform a SQL query to count employees in the specified department
        $query = "SELECT COUNT(id) FROM employees WHERE department_id = $departmentId";

        $result = mysqli_query($connection, $query);

        if ($result) {
            $row = mysqli_fetch_assoc($result);
            echo $row['employeeCount'];
        } else {
            echo 'Error: Unable to fetch employee count.';
        }
    } else {
        echo 'Error: Missing departmentId parameter.';
    }
}
?>
