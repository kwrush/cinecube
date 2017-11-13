/**
 * .../people
 */

'use strict';

var router = require('express').Router();

router.get('/popular', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .personPopular((err, tmdbRes) => {
      if (err) res.send(err);

      res.json(tmdbRes);
    });
});

router.get('/:id', (req, res) => {
  var tmdb = req.app.locals.tmdb;
  tmdb
    .personInfo({ id: req.params.id }, (err, tmdbRes) => {
      if (err) res.send(err);

      res.json(tmdbRes);
    });
});

module.exports = router;