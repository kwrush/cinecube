/**
 * Routes of tv
 * .../api/tv
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
  fetchMediaList(req, res, next, tmdb.miscPopularTvs.bind(tmdb));
});

router.get('/discover', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.discoverTv.bind(tmdb));
});

router.get('/top_rated', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.miscTopRatedTvs.bind(tmdb));
});

router.get('/on_air', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.tvOnTheAir.bind(tmdb));
});

router.get('/:id(\\d+)/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  infoHandler(req, res, next, tmdb.tvInfo.bind(tmdb), (tmdbRes) => {
    return camelCaseKey(tmdbRes);
  });
});

router.get('/:id(\\d+)/credits/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  infoHandler(req, res, next, tmdb.tvCredits.bind(tmdb), (tmdbRes) => {
    let tmpRes = camelCaseKey(tmdbRes);
    tmpRes = normalize(tmpRes, schemas.mediaCredits);
    return tmdbSortCrew(tmpRes);
  });
});

router.get('/:id(\\d+)/images/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  infoHandler(req, res, next, tmdb.tvImages.bind(tmdb), (tmdbRes) => {
    return camelCaseKey(tmdbRes);
  });
});

router.get('/:id(\\d+)/similar/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  infoHandler(req, res, next, tmdb.tvSimilar.bind(tmdb), (tmdbRes) => {
    let tmpRes = camelCaseKey(tmdbRes);
    return normalize(tmpRes, schemas.mediaResults);
  });
});

router.use('/search', require('../../middlewares/encodeQuery'));

router.get('/search', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  tmdb
    .searchTv({
      query: req.query.query,
      page: req.query.page ? req.query.page : 1
    }, (err, tmdbRes) => {
      if (err)
      return next(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = normalize(tmdbRes, schemas.results);
      res.json(tmdbRes);
    });
});

module.exports = router;