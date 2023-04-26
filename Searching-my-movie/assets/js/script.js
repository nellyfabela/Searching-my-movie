// Load the YouTube API client library
gapi.load('client', start);

// Function to initialize the YouTube API client and set up event listeners
function start() {
	gapi.client.init({
		apiKey: 'AIzaSyDMDgHedzc8VgICMrD9qIKyvsbOIk7L41k',
		discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
	}).then(function() {
		console.log('YouTube API client initialized');
		$('#search-form').on('submit', function(event) {
			event.preventDefault();
			var movieTitle = $('#movie-title').val();
			searchTrailer(movieTitle);
		});
	});
}

// Function to search for a movie trailer and display it in a modal
function searchTrailer(movieTitle) {
	// Use the YouTube API to search for the movie trailer
	gapi.client.youtube.search.list({
		q: movieTitle + ' trailer',
		part: 'id',
		type: 'video',
		videoEmbeddable: true
	}).then(function(response) {
		console.log(response);
		if (response.result.items.length > 0) {
			// Extract the video ID of the first result
			var videoId = response.result.items[0].id.videoId;
			// Embed the video in a modal on the web page
			$('#trailer-modal').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
			$('#trailer-modal').show();
		} else {
			alert('No trailer found for ' + movieTitle);
		}
	}, function(error) {
		console.error(error);
		alert('Failed to search for trailer');
	});
}

// Load the YouTube API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Declare global variables for the player and video ID
var player;
var videoId;

// Create the YouTube player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: '',
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Set the video ID and start playing the video
function onPlayerReady(event) {
    event.target.loadVideoById(videoId);
    event.target.playVideo();
}

// When the modal is shown, search for the movie trailer on YouTube and set the video ID
$('#trailerModal').on('shown.bs.modal', function () {
    var movieName = $('#movieName').val();
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'id',
            q: movieName + ' trailer',
            maxResults: 1,
            type: 'video',
            key: 'AIzaSyDMDgHedzc8VgICMrD9qIKyvsbOIk7L41k'
        }, function(data) {
        videoId = data.items[0].id.videoId;
    });
});


