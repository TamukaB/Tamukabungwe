<?php

    // remove for production
    ini_set('display_errors', 'On'); 
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = "";
    switch ($_POST['api']) {
      case 'api1':
        $url = 'http://api.geonames.org/postalCodeCountryInfoJSON?formatted=true&username=tamukabungwe&style=full';
        break;
      case 'api2':
        $url = 'http://api.geonames.org/findNearbyStreetsJSON?formatted=true&lat=37.451&lng=-122.18&username=tamukabungwe&style=full';
        break;
      case 'api3':
        $url = 'http://api.geonames.org/timezoneJSON?formatted=true&lat=47.01&lng=10.2&username=tamukabungwe&style=full';
        break;
      default:
        $url = '';
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL,$url);

    $result=curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result,true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode;

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);

?>
