const config = require('../config.json').config;
const TheMovieDB = require('@leonardocabeza/the-movie-db');

// Use your own api key which is free to get from 
// https://www.themoviedb.org/documentation/api.
const tmdb = new TheMovieDB(config.apiKey);

module.exports = tmdb;