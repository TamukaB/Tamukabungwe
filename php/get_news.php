<?php
header('Content-Type: application/json; charset=utf-8');

if (isset($_POST['country']) && !empty($_POST['country'])) {
    // Fetch country data
    $country = $_POST['country'];
    $apiKey = '9c20d6c6c10948509b2acdc70f57d45e'; // Use your actual News API key

    // Step 1: Fetch a list of news sources
    $sources_url = "https://newsapi.org/v2/sources?country=$country&apiKey=$apiKey";
    $sources_ch = curl_init($sources_url);

    // Set cURL options for sources request
    curl_setopt($sources_ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($sources_ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0');
    curl_setopt($sources_ch, CURLOPT_HEADER, 0);

    $sources_data = curl_exec($sources_ch);
    curl_close($sources_ch);

    if ($sources_data === false) {
        echo json_encode(['error' => 'Failed to fetch news sources']);
        exit;
    }

    $sources_json = json_decode($sources_data, true);

    if ($sources_json['status'] !== 'ok') {
        echo json_encode(['error' => 'Failed to retrieve news sources']);
        exit;
    }

    $news_sources = $sources_json['sources'];

    // Step 2: Fetch top headlines
    $headlines_url = "https://newsapi.org/v2/top-headlines?country=$country&category=general&apiKey=$apiKey";
    $headlines_ch = curl_init($headlines_url);

    // Set cURL options for headlines request
    curl_setopt($headlines_ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($headlines_ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0');
    curl_setopt($headlines_ch, CURLOPT_HEADER, 0);

    $headlines_data = curl_exec($headlines_ch);
    curl_close($headlines_ch);

    if ($headlines_data === false) {
        echo json_encode(['error' => 'Failed to fetch top headlines']);
        exit;
    }

    $headlines_json = json_decode($headlines_data, true);

    if ($headlines_json['status'] !== 'ok') {
        echo json_encode(['error' => 'Failed to retrieve top headlines']);
        exit;
    }

    $news_headlines = $headlines_json['articles'];

    // Combine headlines with their respective sources
    $result = [];

    foreach ($news_headlines as $headline) {
        $source_id = $headline['source']['id'];

        // Find the source information in the list of news sources
        $source_info = array_filter($news_sources, function ($source) use ($source_id) {
            return $source['id'] === $source_id;
        });

        if (!empty($source_info)) {
            $source_info = reset($source_info);
            $headline['source'] = $source_info;
        }

        $result[] = $headline;
    }

    echo json_encode(['status' => 'ok', 'articles' => $result]);
} else {
    echo json_encode(['error' => 'No country code provided']);
}

?>

