<?php 

	$db_config = mysqli_connect('localhost', 'root', '', 'company-directory');
	if (!$db_config) {
		echo "Something went wrong with data base";
	}
	
 ?>