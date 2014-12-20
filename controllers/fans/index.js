var express = require('express');
var router = express.Router();

var pageList = require('./pageList'); 
var pageCreate = require('./pageCreate'); 
var activeCreate = require('./activeCreate'); 

router.route('/list')
	.get(pageList);
	
router.route('/create')
	.get(pageCreate);
	
router.route('/activeCreate')
	.post(activeCreate);

module.exports = router;