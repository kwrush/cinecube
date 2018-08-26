'use strict';

const router = require('express').Router();

const { normalize } = require('normalizr');
const camelCaseKey    = require('../../middlewares/camelCaseKey');
const schemas = require('../../utils/schema');

const { fetchMediaList, fetchPeopleList } = require('../../utils/fetchHandlers')

router.get('/movie', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.searchMovie.bind(tmdb));
});

router.get('/tv', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchMediaList(req, res, next, tmdb.searchTv.bind(tmdb));
});

router.get('/people', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchPeopleList(req, res, next, tmdb.searchPerson.bind(tmdb));
});

router.get('/multi', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;

  tmdb.searchMulti(Object.assign(
    {}, req.query, req.params), (err, tmdbRes) => {
    if (err) return next(err);

    tmdbRes = camelCaseKey(tmdbRes);
    tmdbRes = normalize(tmdbRes, schemas.multiResults);

    res.json(tmdbRes);
  });
});

module.exports = router;