var express = require('express');
var router = express.Router();

var pageHome = require('./pageHome');

router.route('/')
	.get(pageHome);
	
router.route('/index')
	.get(pageHome);

module.exports = router;