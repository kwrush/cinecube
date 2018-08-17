/**
 * Entry point of routers
 */

const bodyParser = require('body-parser');

const { normalize } = require('normalizr');
const camelCaseKey    = require('../middlewares/camelCaseKey');
const { infoHandler } = require('../utils/fetchHandlers');
const schemas = require('../utils/schema');

const router = require('express').Router();

router.use(bodyParser.urlencoded({extended: true}));   
router.use(bodyParser.json());                                                                                 
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.use('/movie', require('./movie'));
router.use('/tv', require('./tv'));
router.use('/people', require('./people'));


router.use('/search/multi', require('../middlewares/encodeQuery'));

// search for movies, tv shows and people in a single request
router.get('/search/multi', (req, res, next) => {
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