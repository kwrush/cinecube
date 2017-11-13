/**
 * Main app
 */

'use strict';

var express = require('express');
var cors    = require('cors');
var morgan  = require('morgan');

var config = require('./config.json').config;

var app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(config.morgan.logType));
}

app.locals.apiKey = config.apiKey;
app.locals.tmdb = require('moviedb')(app.locals.apiKey);

app.use(cors());
app.use('/', require('./routes'));

module.exports = app;