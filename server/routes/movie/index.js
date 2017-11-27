/**
 * .../api/movie
 */

'use strict';

var router = require('express').Router();
var camelCaseKey = require('../../middlewares/camelCaseKey');

router.get('/popular', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularMovies((err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);

      res.json(tmdbRes);
    });
});

router.get('/in_theatre', (req, res) => {
  var tmbd = req.app.locals.tmbd;
  tmdb
    .miscNowPlayingMovies((err, tmdbRes) => {
      if (err) res.send(err);
      tmdbRes = camelCaseKey(tmdbRes);
      res.json(tmdbRes);
    });
});

router.get('/top_rated', (req, res) => {
  var tmdb = req.app.locals.tmbd;
  tmdb
    .miscTopRatedMovies((err, tmdbRes) => {
      if (err) res.send(err);
      tmdbRes = camelCaseKey(tmdbRes);

      res.json(tmdbRes);
    });
});

router.get('/upcoming', (req, res) => {
  var tmdb = req.app.locals.tmbd;
  tmdb
    .miscUpcomingMovies((err, tmdbRes) => {
      if (err) res.send(err);
      tmdbRes = camelCaseKey(tmdbRes);

      res.json(tmdbRes);
    });
});

router.get('/:id', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .movieInfo({ id: req.params.id }, (err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);

      res.json(tmdbRes);
    });
});

router.get('/search', (req, res) => {
  
});

module.exports = router;