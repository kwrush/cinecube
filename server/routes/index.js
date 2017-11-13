/**
 * Entry point of routers
 */

'use strict';

var bodyParser = require('body-parser');
var app = require('express');

var router = app.Router();
router.use(bodyParser.urlencoded({extended: true}));   
router.use(bodyParser.json());                                                                                 
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.use('/movie', require('./movie'));
router.use('/tv', require('./tv'));
router.use('/people', require('./people'));

module.exports = router;