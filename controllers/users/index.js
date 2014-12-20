var express = require('express');
var router = express.Router();

var test = require('./test'); 
var activeCreate = require('./activeCreate'); 
	
router.route('/create')
	.post(activeCreate);
	
module.exports = router;