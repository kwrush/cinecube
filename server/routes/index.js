/**
 * Entry point of routers
 */

'use strict';

const bodyParser = require('body-parser');

const camelCaseKey    = require('../middlewares/camelCaseKey');
const tmdbMultiSearch = require('../middlewares/tmdbMultiSearch');

const router = require('express').Router();

router.use(bodyParser.urlencoded({extended: true}));   
router.use(bodyParser.json());                                                                                 
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.use('/movie', require('./movie'));
router.use('/tv', require('./tv'));
router.use('/people', require('./people'));

// search for movies, tv shows and people in a single request
router.get('/search/multi', (req, res) => {
  const tmdb = req.app.locals.tmdb;
  
  tmdb
    .searchMulti({
        query: req.query.query,
      }, (err, tmdbRes) => {
        if (err)
          return res.status(err.status).send(err.response);
        
        tmdbRes = camelCaseKey(tmdbRes);
        tmdbRes.results = tmdbMultiSearch({
          root: tmdbRes.results,
          posterUrlPrefix: req.app.locals.tmdbPosterUrl,
          backdropUrlPrefix: req.app.locals.tmdbBackdropUrl,
          profileUrlPrefix: req.app.locals.tmdbProfileUrl
        });
        
        res.json(tmdbRes);
    });
});

module.exports = router;