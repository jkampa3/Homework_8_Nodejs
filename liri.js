require("dotenv").config();
var request = require("request");
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var fs = require("fs");

//get key variable
var keys = require('./keys.js');
var spotifykey = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

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
}

console.log(stringValue);

//similar to bank, need to pass in command to swtich to right function
switch (nodeActivity) {
    case "my-tweets":
        if (stringValue) {
            twitter(stringValue);
        } else {
            twitter("Metallica");
        }
        break;

    case "spotify-this-song":
        spotify();
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
}

//Twitter
//Twiter API had Count tied to it
function twitter(stringValue) {
    var params = {screen_name: stringValue, count: 20};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
            console.log("Most Recent Tweets");

            for (var i = 0; i < tweets.length; i++) {
                console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>");
                console.log("Tweet From: " + tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
};


//OMDB
function omdb(stringValue) {
    var queryUrl = "http://www.omdbapi.com/?t=" + stringValue + "&y=&plot=short&&tomatoes=true&r=json&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var parseJSON = JSON.parse(body);
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
            console.log("Movie Title: " + parseJSON.Title);
            console.log("Year of Release: " + parseJSON.Year);
            console.log("IMDB Rating: " + parseJSON.Ratings[0].Value);
            console.log("Rotton Tomato Rating: " + parseJSON.Ratings[1].Value);
            console.log("Country of Production: " + parseJSON.Country);
            console.log("Movie Language: " + parseJSON.Language);
            console.log("Actor(s) or Actress(es): " + parseJSON.Actors);
            console.log("Movie Plot: " + parseJSON.Plot);
            console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
        }
    });
};