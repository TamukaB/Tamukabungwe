<?php
// Read the JSON file
$jsonData = file_get_contents('countryBorders.geo.json');

// Check if the file was read successfully
if ($jsonData === false) {
  // Handle error
  die('Failed to read JSON file.');
}

// Decode the JSON data
$data = json_decode($jsonData, true);

// Check if JSON decoding was successful
if ($data === null) {
  // Handle error
  die('Failed to decode JSON data.');
}

// Return the data
header('Content-Type: application/json');
echo json_encode($data['features']);
?>
