<?php 

	$db_config = mysqli_connect('localhost', 'root', '', 'companydirectory');
	if (!$db_config) {
		echo "Something went wrong with data base";
	}
	
 ?>