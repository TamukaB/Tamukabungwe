<?php
header('Content-Type: application/json; charset=utf-8');


if(isset($_POST['country']) && !empty($_POST['country'])) {
    // Fetch country data
    $country = $_POST['country'];
    $config['useragent'] = 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0';
    $ch = curl_init("https://newsapi.org/v2/top-headlines?country=$country&category=general&apiKey=3ced34d65f464f77a3662d18d71c0c11");
    curl_setopt($ch, CURLOPT_USERAGENT, $config['useragent']);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
} else {
    echo json_encode(['error' => 'No country code provided']);
}
?>

