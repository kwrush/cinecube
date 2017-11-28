/**
 * .../tv
 */

'use strict';

const router = require('express').Router();
const camelCaseKey = require('../../middlewares/camelCaseKey');
const tmdbImageUrl = require('../../middlewares/tmdbImageUrl');

router.get('/popular', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularTvs((err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/top_rated', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscTopRatedTvs((err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/airing', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .tvAiringToday((err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.get('/:id(\\d+)/', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .movieInfo({ id: req.params.id }, (err, tmdbRes) => {
      if (err) res.send(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });

      res.json(tmdbRes);
    });
});

router.use('/search', require('../../middlewares/encodeQuery'));

router.get('/search', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  
  tmdb
    .searchMovie({
      query: req.query.query
    }, (err, tmdbRes) => {
      if (err) res.send(err);
      
      tmdbRes = camelCasekey(tmdbRes);
      tmdbRes = Object.assign({}, tmdbRes, {
        results: tmdbImageUrl({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl
        })
      });
      
      res.json(tmdbRes);
    });
});

module.exports = router;