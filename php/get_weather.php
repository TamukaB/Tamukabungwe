<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

if(isset($_POST['country']) && !empty($_POST['country'])) {
    $ch = curl_init("https://api.weatherapi.com/v1/forecast.json?q=".$_POST['country'][0]."&days=2&key=b1bd5ced999b4c619b193057232405");
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    return $data = json_encode($data);
    if (curl_error($ch)) {
        return  curl_error($ch);
    }
    curl_close($ch);
} else {
    echo 'No data found';
}
?>
