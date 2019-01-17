'use strict';

const { normalize } = require('normalizr');
const camelCaseKey = require('../middlewares/camelCaseKey');
const schemas = require('./schema');

module.exports.fetchMediaList = (req, res, next, fetchFunc) => {
  if (typeof fetchFunc !== 'function') {
    return next(new Error('Input fetchFunc is expected to be a function.'));
  } else {
    fetchFunc(Object.assign({}, req.params, req.query), (err, tmdbRes) => {
      if (err) return next(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = normalize(tmdbRes, schemas.mediaResults);

      res.json(tmdbRes);
    })
  }
};

module.exports.fetchPeopleList = (req, res, next, fetchFunc) => {
  if (typeof fetchFunc !== 'function') {
    return next(new Error('Input fetchFunc is expected to be a function.'));
  } else {
    fetchFunc(Object.assign({}, req.params, req.query), (err, tmdbRes) => {
      if (err) return next(err);

      tmdbRes = camelCaseKey(tmdbRes);
      tmdbRes = normalize(tmdbRes, schemas.peopleResults);

      res.json(tmdbRes);
    })
  }
};

module.exports.infoHandler = (req, res, next, fetchFunc, resHandler) => {
  if (typeof fetchFunc !== 'function') {
    return next(new Error('Input fetchFunc is expected to be a function.'));
  } else {
    fetchFunc({
      id: req.params.id
    }, (err, tmdbRes) => {

      if (err) return next(err);

      if (typeof resHandler !== 'function') {
        return next(new Error('Input resHandler is expected to be a function.'));
      }

      try {
        tmdbRes = resHandler(tmdbRes);
      } catch(e) {
        return next(e);
      }

      res.json(tmdbRes);
    })
  }
};
