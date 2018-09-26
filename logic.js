// Initialize Firebase
var config = {
    apiKey: "AIzaSyCa5t3S2k_IiHs4zYFu6T3bn8aq26oSL0M",
    authDomain: "dj-chat-bot.firebaseapp.com",
    databaseURL: "https://dj-chat-bot.firebaseio.com",
    projectId: "dj-chat-bot",
    storageBucket: "dj-chat-bot.appspot.com",
    messagingSenderId: "869856822775"
};
firebase.initializeApp(config);

var database = firebase.database();
var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');

// When the client's connection state changes...
connectedRef.on("value", function (snap) {
    // If they are connected..
    if (snap.val()) {
        // Add user to the connections list.
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

//lyrics API variables
var lyricsAPIKey = '9oV6enzrwLxHjuKbkfEuYuwqkDly9pSPHix8gcozDfSIcJ4i4kyoXSZT491L7QhC';
var lyricsURL = 'https://orion.apiseeds.com/api/music/lyric/:artist/:track'
var bandInput = $('#band-input').val();
var titleInput = $('#title-input').val();

var youTubeAPIKey = 'AIzaSyDf7m2WR4gwTwBsU605wDNvuCydxt5GVU4';

function pullQuery() {
    bandInput = $('#band-input').val();
    titleInput = $('#title-input').val();
    console.log(bandInput);
    console.log(titleInput);
};

function emptyQuery() {
    $('#band-input').val('');
    $('#title-input').val('');
}

function lyricsAJAX() {
    $.ajax({
        url: 'https://orion.apiseeds.com/api/music/lyric/' + bandInput + '/' + titleInput + '?' + 'apikey=' + lyricsAPIKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var lyrics = response.result.track.text;
        var artist = response.result.artist.name;
        var title = response.result.track.name;
        var lyricsDisplay = $('#lyricsDisplay');
        var titleDisplay = $('#titleDisplay');
        var artistDisplay = $('#artistDisplay');
        artistDisplay.text(artist);
        titleDisplay.text(title);
        lyricsDisplay.text(lyrics);
    });
};

//Calling the YouTube AJAX response
var videoID;

function videoAJAX() {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=' + titleInput + '%2B' + bandInput + '&safeSearch=strict&type=video&videoEmbeddable=true&videoLicense=youtube&key=' + youTubeAPIKey,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        if (response.items[0].id.videoId) {
            videoID = response.items[0].id.videoId;
        }
        else {
            videoID = response.items[1].id.videoId;
        }
        console.log('videoID =' + videoID);

        var newVideoURL = 'https://www.youtube.com/embed/' + videoID + '?enablejsapi=1';
        console.log('new video URL =' + newVideoURL);
        // &origin=http://127.0.0.1:5500/main.html
        $('.scrolling-video').attr('src', newVideoURL);
    });
};

//***USING JQUERY UI EFFECT***/
function runEffect() {
    // Run the effect
    $("#userInput").hide('clip', 1000, callback);
};
// Callback function to bring a hidden box back
function callback() {
    setTimeout(function () {
        $("#userInput").removeAttr("style").hide().fadeIn();
    }, 7000);
};

//***CONNECTION CODE***//
// var connectionsRef = database.ref('connections');
// var connectedRef = database.ref('.info/connected');

// connectedRef.on('value', function (snap) {

//         if (snap.val()) {
//             var con = connectionsRef.push({
//                 playerName: '',
//                 avatar: '',
//                 move: ''
//             });
//             thisPlayerKey = con.key;
//             console.log('thisPlayerKey is: ' + thisPlayerKey)
//             con.onDisconnect().remove();
//         };
// });
//***END OF CONNECTION CODE***/

var band;
var song;
var submitBandSong;
//gets the currently signed in user by using the currentUser property
var user = firebase.auth().currentUser;
if (user) {
function submitBandSong() {
   var data = {
       initials: initialInput.value(),
       band: band
   }
   var data = {
       initials: initialInput.value(),
       song: song
   }
   console.log(data);
   var ref = database.ref('band', 'song');
   ref.push(data);
   }
} else {
   //no user is signed in
}

$(document).ready(function () {
    $('.collapsible').collapsible();

    $('#submit-button').on('click', function () {
        pullQuery();
        runEffect();
        videoAJAX();
        lyricsAJAX();
        emptyQuery();
    })
});