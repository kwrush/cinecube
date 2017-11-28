/**
 * .../api/movie
 */

'use strict';

const router = require('express').Router();
const camelCaseKey = require('../../middlewares/camelCaseKey');
const tmdbImageUrl = require('../../middlewares/tmdbImageUrl');

router.get('/popular', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscPopularMovies((err, tmdbRes) => {
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

router.get('/in_theatre', (req, res) => {
  const tmbd = req.app.locals.tmdb;
  tmdb
    .miscNowPlayingMovies((err, tmdbRes) => {
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
    .miscTopRatedMovies((err, tmdbRes) => {
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

router.get('/upcoming', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  tmdb
    .miscUpcomingMovies((err, tmdbRes) => {
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

module.exports = router;