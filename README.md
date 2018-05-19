# Homework_8_Nodejs_LIRI_Bot

## Overview
In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Assignment Objective
* Receive last 20 Tweets of hardcoded Twitter Handle (Twitter)
* Fetch Movie Details (OMDB/IMDB):
  * By Movie Name
  * If no movie, default to preset movie
* Fetch Song Details (Spotify):
  * By Song Name
  * If no song, default to preset song
* Read Text File Input

## NPM Required
* npm install dotenv
* npm install twitter
* npm install node-spotify-api
* npm install request
* npm install fs

## Sample Commands
* node liri.js my-tweets
* node liri.js spotify-this-song '<song name here>'
* node liri.js movie-this '<movie name here>'
* node liri.js do-what-it-says 
