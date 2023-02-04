function colorLog(message, color) {
  color = color || 'black'

  switch (color) {
    case 'success':
      color = 'Green'
      break
    case 'info':
      color = 'DodgerBlue'
      break
    case 'error':
      color = 'Red'
      break
    case 'warning':
      color = 'Orange'
      break
    default:
      color = color
  }

  console.log('%c' + message, 'color:' + color)
}

$('form[name="spotify-downloader"]').submit(function (e) {
  e.preventDefault()
  let button = $(this).find('button[type="submit"]')
  let url = $(this).find('input[type="url"]').val()
  let form = $(this)
  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(track)(?::|\/)((?:[0-9a-zA-Z]){22})/
  const match = url.match(regEx)
  function msToTime(s) {
    let minutes = Math.floor(s / 60000)
    let seconds = ((s % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
  if (match) {
    $.ajax({
      type: 'post',
      url: `./api?track=${match[2]}`,
      dataType:'json',
      beforeSend: function () {
        $('.error').hide()
        button.attr('disabled', true).html('searching')
      },
      success: function (data) {
        let songInfo = `
<div class="col-auto">
                <img src="${
                  data.album.images[0].url
                }" class="img-thumbnail" alt="..." width="96px" height="96px">
            </div>

                <div class="col-auto">
                    <h6 class="title">${data.name}</h6>
                    <p class="text-muted text-start fs-6 m-0">${data.artists[0].name}</p>
                    <p class="text-muted text-start fs-6">Duration: ${msToTime(
                      data.duration_ms
                    )}</p>
                </div>

                <div class="col-12 mt-3">
                    <div class="d-grid gap-2 mx-auto">
                        <button class="btn btn-success btn-search" id="download" data-title='${
                          data.name
                        }' data-src="${data.album.images[0].url}" data-artist='${
          data.artists[0].name
        }'>Download track</button>
                        <a href="${
                          data.album.images[0].url
                        }" class="link-dark" target="_blank">Download artwork</a>
                    </div>
                </div>
`

        $('.song').html('')
        $(`${songInfo}`).hide().prependTo('.song').fadeIn()
        button.attr('disabled', false).html('search')
      },
      error: function () {
        $('.error').show()
        button.attr('disabled', false).html('search')
      },
    })
  } else {
    $('.error').show()
  }
})

//download
function downloadTrack() {
  let button = $('#download')
  let title = $('#download').attr('data-title')
  let src = $('#download').attr('data-src')
  let artist = $('#download').attr('data-artist')
  let url = $('form').find('input[type="url"]').val()
  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(track)(?::|\/)((?:[0-9a-zA-Z]){22})/
  const match = url.match(regEx)
  if (match) {
    window.location.href='./api?download=track&uri=' + url + '&title=' + title + '&src=' + src + '&artist=' + artist
  }

}

$(document).on('click', '#download', downloadTrack)

/*
---------------
Album downloader
================
 */
let tracks = []
$('form[name="album-downloader"]').submit(function (e) {
  e.preventDefault()
  let button = $(this).find('button[type="submit"]')
  let url = $(this).find('input[type="url"]').val()
  let form = $(this)
  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(album)(?::|\/)((?:[0-9a-zA-Z]){22})/
  const match = url.match(regEx)
  function msToTime(s) {
    let minutes = Math.floor(s / 60000)
    let seconds = ((s % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
  if (match) {
    $.ajax({
      type: 'post',
      url: `./api?album=${match[2]}`,
      dataType:'json',
      beforeSend: function () {
        $('.error').hide()
        button.attr('disabled', true).html('searching')
      },
      success: function (data) {
        let songInfo = `
<div class="col-auto">
                <img src="${data.images[0].url}" class="img-thumbnail" alt="..." width="96px" height="96px">
            </div>

                <div class="col-auto">
                    <h6 class="title">${data.name}</h6>
                    <p class="text-muted text-start fs-6 m-0">${data.artists[0].name}</p>
                    <p class="text-muted text-start fs-6">Tracks: ${data.total_tracks}</p>
                </div>

                <div class="col-12 mt-3">
                    <div class="d-grid gap-2 mx-auto">
                        <button class="btn btn-success btn-search" id="download-album" data-title="${data.name} " data-src="${data.images[0].url}" data-artist="${data.artists[0].name}">Download Album</button>
                        <a href="${data.images[0].url}" class="link-dark" target="_blank">Download artwork</a>
                    </div>
                </div>
`
        for (let song of data.tracks.items) {
          tracks.push({
            name: song.name,
            artist: song.artists[0].name,
          })
        }
        $('.song').html('')
        $(`${songInfo}`).hide().prependTo('.song').fadeIn()
        button.attr('disabled', false).html('search')
      },
      error: function () {
        $('.error').show()
        button.attr('disabled', false).html('search')
      },
    })
  } else {
    $('.error').show()
  }
})

//download album
function downloadAlbum() {
  let button = $('#download-album')
  let title = $('#download-album').attr('data-title')
  let artist = $('#download-album').attr('data-artist')
  let src = $('#download-album').attr('data-src')
  let url = $('form').find('input[type="url"]').val()
  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(album)(?::|\/)((?:[0-9a-zA-Z]){22})/
  const match = url.match(regEx)
  if (match) {
    $.ajax({
      type: 'post',
      headers: {
        id: localStorage.getItem('id'),
      },
      data: {
        _csrf: $('input[name="_csrf"]').val(),
        title: title,
        src: src,
        artist: artist,
        tracks: tracks,
      },
      beforeSend: function () {
        $('.error').hide()
        button.attr('disabled', true).html('Downloading')
      },
      success: function (data) {
        if (data.redirect) {
          button.attr('disabled', false).html('Download')

          window.open('./download_album?title=' + data.path, '_blank')
        }
      },
      error: function () {
        $('.error').show()
        button.attr('disabled', false).html('Download')
      },
    })
  }
}

$(document).on('click', '#download-album', downloadAlbum)

/*
---------------
playlist downloader
================
 */
$('form[name="playlist-downloader"]').submit(function (e) {
  e.preventDefault()
  let button = $(this).find('button[type="submit"]')
  let url = $(this).find('input[type="url"]').val()
  let form = $(this)
  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(playlist)(?::|\/)((?:[0-9a-zA-Z]){22})/
  const match = url.match(regEx)
  function msToTime(s) {
    let minutes = Math.floor(s / 60000)
    let seconds = ((s % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
  if (match) {
    $.ajax({
      type: 'post',
      url: `./api?playlist=${match[2]}`,
      dataType:'json',
      beforeSend: function () {
        $('.error').hide()
        button.attr('disabled', true).html('searching')
      },
      success: function (data) {
        let songInfo = `
<div class="col-auto">
                <img src="${data.images[0].url}" class="img-thumbnail" alt="..." width="96px" height="96px">
            </div>

                <div class="col-auto">
                    <h6 class="title">${data.name}</h6>
                    <p class="text-muted text-start fs-6 m-0">${data.owner.display_name}</p>
                    <p class="text-muted text-start fs-6">Tracks: ${data.tracks.total}</p>
                </div>

                <div class="col-12 mt-3">
                    <div class="d-grid gap-2 mx-auto">
                        <button class="btn btn-success btn-search" id="download-playlist" data-title="${data.name} " data-src="${data.images[0].url}" data-artist="${data.owner.display_name}">Download Playlist</button>
                        <a href="${data.images[0].url}" class="link-dark" target="_blank">Download artwork</a>
                    </div>
                </div>
`
        for (let song of data.tracks.items) {
          tracks.push({
            name: song.track.name,
            artist: song.track.artists[0].name,
          })
        }
        $('.song').html('')
        $(`${songInfo}`).hide().prependTo('.song').fadeIn()
        button.attr('disabled', false).html('search')
      },
      error: function () {
        $('.error').show()
        button.attr('disabled', false).html('search')
      },
    })
  } else {
    $('.error').show()
  }
})

/*---------------------
//download playlist
--------------------- */
function downloadPlaylist() {
  let button = $('#download-playlist')
  let title = $('#download-playlist').attr('data-title')
  let artist = $('#download-playlist').attr('data-artist')
  let src = $('#download-playlist').attr('data-src')
  let url = $('form').find('input[type="url"]').val()
  const regEx =
    /^(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/))(?:embed)?\/?(playlist)(?::|\/)((?:[0-9a-zA-Z]){22})/
  const match = url.match(regEx)
  if (match) {
    $.ajax({
      type: 'post',
      timeout: 0,
      headers: {
        id: localStorage.getItem('id'),
      },
      data: {
        _csrf: $('input[name="_csrf"]').val(),
        title: title,
        src: src,
        artist: artist,
        tracks: tracks,
      },
      beforeSend: function () {
        $('.error').hide()
        button.attr('disabled', true).html('Downloading')
      },
      success: function (data) {
        if (data.redirect) {
          button.attr('disabled', false).html('Download')

          window.open('./download_playlist?title=' + data.path, '_blank')
        }
      },
      error: function () {
        $('.error').show()
        button.attr('disabled', false).html('Download')
      },
    })
  }
}

$(document).on('click', '#download-playlist', downloadPlaylist)
