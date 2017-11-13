/**
 * .../tv
 */

'use strict';

var router = require('express').Router();

router.get('/popular', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularTvs((err, tmdbRes) => {
      if (err) res.send(err);

      res.json(tmdbRes);
    });
});

router.get('/:id', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .tvInfo({ id: req.params.id }, (err, tmdbRes) => {
      if (err) res.send(err);

      res.json(tmdbRes);
    });
});

module.exports = router;