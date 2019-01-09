/**
 * Routes of movie
 * .../api/movie
 */

'use strict';

const router = require('express').Router();

const { normalize } = require('normalizr');

const camelCaseKey = require('../../middlewares/camelCaseKey');
const tmdbSortCrew = require('../../middlewares/tmdbSortCrew');
const schemas = require('../../utils/schema');
const { fetchMediaList, infoHandler } = require('../../utils/fetchHandlers');


/**
 * Fetchs list of popular movies
 */
router.get('/popular', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.miscPopularMovies.bind(tmdb));
});

router.get('/discover', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.discoverMovie.bind(tmdb));
});

router.get('/upcoming', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.miscUpcomingMovies.bind(tmdb));
});

router.get('/top_rated', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.miscTopRatedMovies.bind(tmdb));
});

router.get('/in_theatre', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.miscNowPlayingMovies.bind(tmdb));
});

router.get('/:id(\\d+)/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  infoHandler(req, res, next, tmdb.movieInfo.bind(tmdb), (tmdbRes) => {
    return camelCaseKey(tmdbRes);
  });
});

router.get('/:id(\\d+)/credits/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  infoHandler(req, res, next, tmdb.movieCredits.bind(tmdb), (tmdbRes) => {
    let tmpRes = camelCaseKey(tmdbRes);
    tmpRes = normalize(tmpRes, schemas.mediaCredits);
    return tmdbSortCrew(tmpRes);
  });
});

router.get('/:id(\\d+)/images/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  infoHandler(req, res, next, tmdb.movieImages.bind(tmdb), (tmdbRes) => {
    return camelCaseKey(tmdbRes);
  });
});

router.get('/:id(\\d+)/similar/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  infoHandler(req, res, next, tmdb.movieSimilar.bind(tmdb), (tmdbRes) => {
    let tmpRes = camelCaseKey(tmdbRes);
    return normalize(tmpRes, schemas.mediaResults);
  });
});

module.exports = router;