/**
 * Routes of persons
 * .../api/people
 */

'use strict';

const router        = require('express').Router();
const { normalize } = require('normalizr');
const camelCaseKey  = require('../../middlewares/camelCaseKey');
const schemas       = require('../../utils/schema');

const { fetchPeopleList, infoHandler } = require('../../utils/fetchHandlers');

router.get('/popular', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  fetchPeopleList(req, res, next, tmdb.personPopular.bind(tmdb));
});

router.get('/:id(\\d+)/', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  infoHandler(req, res, next, tmdb.personInfo.bind(tmdb), (tmdbRes) => {
    return camelCaseKey(tmdbRes);
  });
});

router.get('/:id(\\d+)/credits', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  infoHandler(req, res, next, tmdb.personCombinedCredits.bind(tmdb), (tmdbRes) => {
    let tmpRes = camelCaseKey(tmdbRes);
    return normalize(tmpRes, schemas.peopleCredits);
  });
});

router.get('/:id(\\d+)/images', (req, res, next) => {
  const tmdb = req.app.locals.tmdb;
  infoHandler(req, res, next, tmdb.personImages.bind(tmdb), (tmdbRes) => {
    let tmpRes = camelCaseKey(tmdbRes);
    return normalize(tmpRes, schemas.peopleCredits);
  });
});

module.exports = router;