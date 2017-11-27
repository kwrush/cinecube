/**
 * .../tv
 */

'use strict';

var router = require('express').Router();
var camelCaseKey = require('../../middlewares/camelCaseKey');

router.get('/popular', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularTvs((err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);


      res.json(tmdbRes);
    });
});

router.get('/top_rated', (req, res) => {
  var tmdb = req.app.locals.tmbd;
  tmdb
    .miscTopRatedTvs((err, tmdbRes) => {
      if (err) res.send(err);
      tmdbRes = camelCaseKey(tmdbRes);

      res.json(tmdbRes);
    });
});

router.get('/airing', (req, res) => {
  var tmdb = req.app.locals.tmbd;
  tmdb
    .tvAiringToday((err, tmdbRes) => {
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