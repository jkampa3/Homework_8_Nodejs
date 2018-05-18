require("dotenv").config();
var request = require("request");
var spotify = require("node-spotify-api");
var twitter = require("twitter");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
