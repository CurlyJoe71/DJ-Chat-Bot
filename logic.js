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

var ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

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

//user input variables


//lyrics variables
var lyricsAPIKey = '9oV6enzrwLxHjuKbkfEuYuwqkDly9pSPHix8gcozDfSIcJ4i4kyoXSZT491L7QhC';
var lyricsURL = 'https://orion.apiseeds.com/api/music/lyric/:artist/:track'
var artistRequest = ''


var spotifyAPIKey = '41f1e6b39f974a18bf48f26553dbb960';
var youTubeAPIKey = 'AIzaSyDf7m2WR4gwTwBsU605wDNvuCydxt5GVU4';


function lyricsAJAX() {
    $.ajax({
        url: 'https://orion.apiseeds.com/api/music/lyric/smashing pumpkins/1979?apikey=9oV6enzrwLxHjuKbkfEuYuwqkDly9pSPHix8gcozDfSIcJ4i4kyoXSZT491L7QhC',
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
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
  }
  
  // Search for a specified string.
  function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet'
    });
  
    request.execute(function(response) {
      var str = JSON.stringify(response.result);
      $('#search-container').html('<pre>' + str + '</pre>');
    });
  };


  $(document).ready(function () {
    $('.collapsible').collapsible();
});