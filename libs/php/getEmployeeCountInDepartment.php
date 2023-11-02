<?php
// Include your database connection code here
include_once("../includes/connect.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['departmentId'])) {
        $departmentId = $_POST['departmentId'];

        // Perform a SQL query to count employees in the specified department
        $query = "SELECT COUNT(id) AS employeeCount FROM employees WHERE department_id = $departmentId";

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
