//Required NPM Files
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

//get key variable
var keys = require('./keys.js');

//get input command
var nodeActivity = process.argv[2];
var nodeArgs = process.argv;
var stringValue = "";

//loop to get input string value (when spaces are involved)
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        stringValue = stringValue + "+" + nodeArgs[i];
    } else {
        stringValue = stringValue + nodeArgs[i];
    }
};

//console.log("Input: " + stringValue);

//similar to bank, need to pass in command to swtich to right function
switch (nodeActivity) {
    case "my-tweets":
        twitter();
        //if (stringValue) {
        //    twitter(stringValue);
        //} else {
        //    twitter("Metallica");
        //};
        break;

    case "spotify-this-song":
        if (stringValue) {
            spotify(stringValue);
        } else {
            spotify("Ace of Base");
        };
        break;

    case "movie-this":
        if (stringValue) {
            omdb(stringValue);
        } else {
            omdb("Mr Nobody");
        };
        break;

    case "do-what-it-says":
        randomFile();
        break;
};

//Twitter
//Twiter API had Count tied to it
function twitter() {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'Metallica', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
            console.log("Most Recent Tweets");

            for (var i = 0; i < tweets.length; i++) {
                console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>");
                console.log("Tweet From: " + tweets[i].created_at);
                console.log(tweets[i].text);
            }
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
        }
    });
};

//Spotify
function spotify(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });
};

//OMDB
function omdb(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&&tomatoes=true&r=json&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var parseJSON = JSON.parse(body);
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
            console.log("Movie Title: " + parseJSON.Title);
            console.log("Year of Release: " + parseJSON.Year);
            console.log("IMDB Rating: " + parseJSON.Ratings[0].Value);
            console.log("Rotten Tomato Rating: " + parseJSON.Ratings[1].Value);
            console.log("Country of Production: " + parseJSON.Country);
            console.log("Movie Language: " + parseJSON.Language);
            console.log("Actor(s) or Actress(es): " + parseJSON.Actors);
            console.log("Movie Plot: " + parseJSON.Plot);
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
        }
    });
};

//File Read to Spotify
function randomFile() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var textFile = data.split(',');
        spotify(textFile[1]);
    });
};
