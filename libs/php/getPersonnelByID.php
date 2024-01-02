<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getPersonnelByID.php?id=<id>

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}
$id = $_POST['id'];

	// first query - SQL statement accepts parameters and so is prepared to avoid SQL injection.
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production
$sql = "select
                            p.id, 
                            p.firstName, 
                            p.lastName, 
                            p.jobTitle, 
                            p.email, 
                            p.departmentID, 
                            d.name as department, l.name as location from personnel p inner join department d on p.departmentID = d.id inner join location l on d.locationID = l.id where p.id = $id order by p.lastName, p.firstName ASC";

$result = $conn->query($sql);


if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
    
	$result = mysqli_fetch_array($result);


   	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['personnel'] = json_encode($result);
	mysqli_close($conn);
	echo json_encode($output);

?>