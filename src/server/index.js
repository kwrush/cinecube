/**
 * A simple REST server for cinecube app. 
 * The APIs are are powered by moviedb nodejs library(https://github.com/impronunciable/moviedb)
 * which uses themoviedb.org v3 API(https://developers.themoviedb.org/3/getting-started) 
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config.json').config;
const apiRouter = require('./routes');

const staticPath = path.join(__dirname, '../build');
const app = express();

if (app.get('env') !== 'test') {
  const morgan = require('morgan');
  app.use(morgan(require('./config.json').morgan.logType));
}

app.use(cors());
app.use('/api', apiRouter);

// server static contents
app.use(express.static(staticPath));

// sends a 404 error for other routes
app.get('*', (req, res, next) => {
  res.status(404).json({
    message: 'The resource you requested could not be found.'
  });
});

app.use(require('./middlewares/errorLogger'));

app.listen(config.httpPort, () => {
  console.log('Server is listening on port:', config.httpPort);
});