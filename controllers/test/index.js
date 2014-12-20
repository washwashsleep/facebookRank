var express = require('express');
var router = express.Router();

var homePage = require('./homePage'); 

router.route('/')
	.get(homePage);
	
router.route('/homePage')
	.get(homePage);

module.exports = router;