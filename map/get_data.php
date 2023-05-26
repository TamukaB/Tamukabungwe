<?php
header('Content-Type: application/json; charset=utf-8');

if(isset($_POST['country']) && !empty($_POST['country'])) {
    $ch = curl_init("https://restcountries.com/v3.1/alpha/". $_POST['country']);

    curl_setopt($ch, CURLOPT_HEADER, 0);

    $data = curl_exec($ch);
    return $data = json_encode($data);
    if($data){
        $ch = curl_init("https://api.weatherapi.com/v1/forecast.json?q=".$data[0]['capital']."&days=1&key=b1bd5ced999b4c619b193057232405". $_POST['country']);
    }
    if (curl_error($ch)) {
        echo curl_error($ch);
    }
    curl_close($ch);
} else {
    echo 'No data found';
}
?>
