/**
 * Main app
 */

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const path    = require('path');

const config = require('./config.json').config;

const staticPath = path.join(__dirname, '../build');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(require('./config.json').morgan.logType));
}

// Use your own api key which is free to get from 
// https://www.themoviedb.org/documentation/api.
app.locals.apiKey          = config.apiKey;
app.locals.tmdb            = require('moviedb')(app.locals.apiKey);
app.locals.tmdbPosterUrl   = config.posterUrl;
app.locals.tmdbBackdropUrl = config.backdropUrl;
app.locals.tmdbProfileUrl  = config.profileUrl;

app.use(cors());
app.use('/api', require('./routes'));

// server static contents
app.use(express.static(staticPath));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(staticPath, 'index.html'));
});

module.exports = app;