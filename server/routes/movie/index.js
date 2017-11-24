/**
 * .../api/movie
 */

'use strict';

var router = require('express').Router();

router.get('/popular', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularMovies((err, tmdbRes) => {
      if (err) res.send(err);

      res.json(tmdbRes);
    });
});

router.get('/:id', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .movieInfo({ id: req.params.id }, (err, tmdbRes) => {
      if (err) res.send(err);

      res.json(tmdbRes);
    });
});

module.exports = router;