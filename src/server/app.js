/**
 * Main app
 */

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const config = require('./config.json').config;

const staticPath = path.join(__dirname, '../build');

const app = express();

// Use your own api key which is free to get from 
// https://www.themoviedb.org/documentation/api.
app.locals.apiKey = config.apiKey;
app.locals.tmdb   = require('moviedb')(app.locals.apiKey);

if (app.get('env') !== 'test') {
  const morgan = require('morgan');
  app.use(morgan(require('./config.json').morgan.logType));
}

app.use(cors());
app.use('/api', require('./routes'));

// server static contents
app.use(express.static(staticPath));

// sends a 404 error for other routes
app.get('*', (req, res, next) => {
  res.status(404).json({
    message: 'The resource you requested could not be found.'
  });
});

app.use(require('./middlewares/errorLogger'));

module.exports = app;