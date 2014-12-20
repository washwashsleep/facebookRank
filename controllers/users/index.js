var express = require('express');
var router = express.Router();

var test = require('./test'); 
var create = require('./create'); 
var fansListPage = require('./fansListPage'); 
// var homePage = require('./homePage'); 
	
router.route('/create')
	.post(create);
	
router.route('/fansList')
	.get(fansListPage);

// router.route('/test')
// 	.get(test);
	
// router.route('/homePage')
// 	.get(homePage);

module.exports = router;