/**
 * Entry point of routers
 */

const bodyParser = require('body-parser');

const router = require('express').Router();

router.use(bodyParser.urlencoded({extended: true}));   
router.use(bodyParser.json());                                                                                 
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.use('/movie', require('./movie'));
router.use('/tv', require('./tv'));
router.use('/people', require('./people'));
router.use('/search', require('./search'));

module.exports = router;