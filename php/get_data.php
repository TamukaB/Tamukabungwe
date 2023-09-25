<?php
header('Content-Type: application/json; charset=utf-8');

// Function to sort the country data
function sortCountryData($countryData) {
    $country = [];
    foreach ($countryData['features'] as $feature) {
        $temp = null;
        $temp['code'] = $feature["properties"]['iso_a2'];
        $temp['name'] = $feature["properties"]['name'];
        array_push($country, $temp);
    }

    usort($country, function ($item1, $item2) {
        return $item1['name'] <=> $item2['name'];
    });

    return $country;
}

if(isset($_POST['country']) && !empty($_POST['country'])) {
    // Fetch country data
    $ch = curl_init("https://restcountries.com/v3.1/alpha/". $_POST['country']);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);

    // Decode the response
    $countryData = json_decode($data);
    // Check if country data is valid
    if ($countryData && isset($countryData[0]['capital'])) {
        // Fetch country borders data
        $countryBordersData = json_decode(file_get_contents("countryBorders.geo.json"), true);

        // Sort the country data
        $sortedCountryData = sortCountryData($countryBordersData);

        // Assemble the final output
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['data']['country'] = $countryData;
        $output['data']['sorted_country'] = $sortedCountryData;
        echo $output;
      echo json_encode($output);
    }
} else {
    echo json_encode(['error' => 'No country code provided']);
}
?>

