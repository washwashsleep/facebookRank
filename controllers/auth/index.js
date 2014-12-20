var express = require('express');
var router = express.Router();

var acticeLogout = require('./activeLogout');  
var pageLogin = require('./pageLogin'); 

router.route('/login')
	.get(pageLogin);
	
router.route('/activelogout')
	.post(acticeLogout);

module.exports = router;