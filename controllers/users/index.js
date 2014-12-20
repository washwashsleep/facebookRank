var express = require('express');
var router = express.Router();

var test = require('./test'); 
var create = require('./create'); 
// var homePage = require('./homePage'); 

router.route('/test')
	.get(test);
	
router.route('/create')
	.post(create);
	
// router.route('/homePage')
// 	.get(homePage);

module.exports = router;