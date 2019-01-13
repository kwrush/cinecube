/**
 * Entry point of routers
 */
const express = require('express');
const bodyParser = require('body-parser');
const MovieRoutes = require('./MovieRoutes');
const TvRoutes = require('./TvRoutes');
const PeopleRoutes = require('./PeopleRoutes');

const apiRouter = express.Router();

apiRouter.use(bodyParser.urlencoded({extended: true}));   
apiRouter.use(bodyParser.json());                                                                                 
apiRouter.use(bodyParser.json({ type: 'application/vnd.api+json' }));

new MovieRoutes(apiRouter);
new TvRoutes(apiRouter);
new PeopleRoutes(apiRouter);

/* router.use('/movie', require('./movie'));
router.use('/tv', require('./tv'));
router.use('/people', require('./people'));
router.use('/search', require('./search')); */

module.exports = apiRouter;