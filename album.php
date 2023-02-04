<?php
include 'partials/header.php';
?>
    <div class="container text-center mt-5">
        <h1>Spotify Downloader</h1>
        <h5 class="mt-3">Enter a Spotify album to download a song</h5>

        <div class="card mt-5">
            <div class="card-body">
                <form class="row g-3" name="album-downloader">
                    <div class="col-lg-10 col-md-12  col-sm-12">
                        <label for="inputUrl" class="visually-hidden">url</label>
                        <input type="url" class="form-control" id="inputUrl" placeholder="Example: https://open.spotify.com/track/3LQTJhA1bJpKNwEzwpdJzk" required>
                    </div>
                    <div class="col-lg-auto col-md-12  col-sm-12">
                        <div class="d-grid gap-2 mx-auto">
                            <button type="submit" class="btn btn-success btn-search">Search</button>
                        </div>
                    </div>

                    <!--feedback-->
                    <div class="error text-danger" style="display: none">
                        <h6>Spotify servers unreachable. Please try again later.</h6>
                    </div>

                    <!--progress-->
                    <div class="song-progress" style="display: none">

                    </div>
                </form>

                <!--song info-->
                <div class="row mt-5  text-center song">

                </div>
            </div>
        </div>

        <h1 class="mt-5">Download songs from Spotify</h1>
        <p>
            Our <strong>spotify downloader</strong> and converter allows you to download songs from spotify for free.
            It convert spotify music to mp3 in very high quality.
        </p>
        <p>Downloading from spotify has never been easier and faster than with Spotify Downloader.</p>
    </div>
    <div class="container text-center">
        <div class="index-module--faq--1Nx6Q" >
            <p class="index-module--faqMainTitle--3hTby">Frequently Asked Questions</p>
            <p class="index-module--faqTitle--rrv6z">Can you download music from spotify?</p>
            <p class="index-module--faqText--OTwdN">Yes, you can download to mp3 every music you find on spotify in 320kbps quality.</p>
            <p class="index-module--faqText--OTwdN">Our mp3 converter is secured, fast and free to bring you the best experience possible.</p>
            <p class="index-module--faqTitle--rrv6z">Which browser can I use for this spotify downloader ?</p>
            <p class="index-module--faqText--OTwdN">You can convert a spotify song to mp3 with chrome, firefox and safari.</p>
            <p class="index-module--faqTitle--rrv6z">How to download songs from spotify desktop app ?</p>
            <ul class="index-module--faqList--uLBUi">
                <li>- Open the spotify app and go to the music page</li>
                <li>- Click on three dots</li>
                <li>- Select "Share" and click on "Copy Song Link"</li>
                <li>- Paste it in above text input</li>
                <li>- Click to “Search” to check track informations</li>
                <li>- Click to "DownloadController song" and it will start automatically</li>
            </ul>
            <p class="index-module--faqTitle--rrv6z">How to download from spotify mobile app ?</p>
            <ul class="index-module--faqList--uLBUi">
                <li>- Open the spotify app and go to the music page</li>
                <li>- Click on "Share" button then "Copy Link"</li>
                <li>- Paste the link in the text input</li>
                <li>- Click on "Search" then "DownloadController"</li>
            </ul>
            <p class="index-module--faqTitle--rrv6z">Can you download spotify music from iphone or ipad?</p>
            <p class="index-module--faqText--OTwdN">Yes, it's possible only on Safari browser for iPhone with iOS 13 or greater and latest versions of iPad. Make sure to upgrade your devices before trying it. <br> It's not working with Chrome and Firefox for iOS. </p>
            <p class="index-module--faqTitle--rrv6z">Can you download a spotify playlist?</p>
            <p class="index-module--faqText--OTwdN">You can use our <a href="/playlist-downloader">Spotify Playlist Downloader</a> which allows you to download every public playlist from spotify without any limitation. <a href="/playlist-downloader">Try it out here!</a>
            </p>
        </div>
    </div>
<?php
include 'partials/footer.php';
?>