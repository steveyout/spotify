<?php
require  '../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable('../');
$dotenv->load();
$dotenv->required(['CLIENT_ID', 'CLIENT_SECRET','ACCESS_TOKEN']);
$session = new SpotifyWebAPI\Session(
    $_ENV['CLIENT_ID'],
    $_ENV['CLIENT_SECRET']
);
$session->requestCredentialsToken();
$api = new SpotifyWebAPI\SpotifyWebAPI();
use YoutubeDl\Options;
use YoutubeDl\YoutubeDl;
use Madcoda\Youtube;
$youtube = new Youtube(['key'=>$_ENV['YOUTUBE_KEY']]);


$yt = new YoutubeDl();
$yt->setBinPath('C:\Users\User\Downloads\yt-dlp');
$accessToken ='';

if (isset($_ENV['ACCESS_TOKEN'])&&!empty($_ENV['ACCESS_TOKEN'])){
    $accessToken=$_ENV['ACCESS_TOKEN'];
    $api->setAccessToken($accessToken);
}else{
    $accessToken=$session->getAccessToken();
    $api->setAccessToken($accessToken);
    $_ENV['ACCESS_TOKEN']=$accessToken;
}


if (isset($_GET['track'])){
    try {
        $track=$_GET['track'];
        $track = $api->getTrack($track);
        echo json_encode($track);
    } catch (SpotifyWebAPI\SpotifyWebAPIException $e) {
        http_response_code(500);
        echo 'Spotify API Error: ' . $e->getMessage(); // Will be 404
    }
}

///download
if (isset($_GET['download'],$_GET['title'],$_GET['artist'])){
    try {
        $track=$_GET['title'];
        $type=$_GET['download'];
        $artist=$_GET['artist'];
        $song=$youtube->searchVideos("$track $artist")[0]->id->videoId;
        $song= $yt->download(
            Options::create()
                ->url('https://www.youtube.com/watch?v='.$song)
                ->skipDownload(true)
                ->extractAudio(true)
                ->audioFormat('mp3')
                ->audioQuality('0')
                ->downloadPath('downloads')
        );
        $song=$song->getVideos()[0];
        $url=$song->getUrl();
        $file_name=$track.'.mp3';
        $data = get_headers($url, true);
        $fileSize = isset($data['Content-Length'])?(int) $data['Content-Length']:0;
        header('Content-Type: application/octet-stream');
        header("Content-Transfer-Encoding: Binary");
        header('Content-Length: ' . $fileSize);
        header("Content-disposition: attachment; filename=\"".basename($file_name)."\"");
        readfile($url);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo $e->getMessage(); // Will be 404
    }
}