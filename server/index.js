/**
 * A simple REST server for cinematify app. 
 * The APIs are are powered by moviedb nodejs library(https://github.com/impronunciable/moviedb)
 * which uses themoviedb.org v3 API(https://developers.themoviedb.org/3/getting-started) 
 */

'use strict';

var config = require('./config.json').config;
var app = require('./app');

app.listen(config.httpPort, () => {
  console.log('Server is listening on port:', config.httpPort);
});