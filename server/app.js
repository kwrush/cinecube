/**
 * Main app
 */

'use strict';

var express = require('express');
var cors    = require('cors');
var morgan  = require('morgan');
var path    = require('path');

var config = require('./config.json').config;

var staticPath = path.join(__dirname, '../build');

var app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(require('./config.json').morgan.logType));
}

app.locals.apiKey = config.apiKey;
app.locals.tmdb = require('moviedb')(app.locals.apiKey);

app.use(cors());
app.use('/api', require('./routes'));

// server static contents
app.use(express.static(staticPath));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(staticPath, 'index.html'));
});

module.exports = app;