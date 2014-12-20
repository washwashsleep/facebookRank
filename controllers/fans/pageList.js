var _ = require('lodash');
var async = require('async');
var request = require('request');

var db = require('../../models');

module.exports = function (req, res, next){
	
	async.waterfall([
		function (cb){
			if(!req.session.user || !req.session.user.userId){
				return res.redirect('/auth/login');
			}
			
			cb();
		},
		
		function (cb){
			db.userFansList.findOne({ userId: req.session.user.userId }, cb);
		},
		
		function (userFansInfo, cb){
			if(!userFansInfo){
				return cb(null, []);
			}
			
			db.fans.find({ fanId: { $in: userFansInfo.list } }, cb);
		}
	],
	function (err, userFansList){
		if(err){
			return next(err);
		}
		// res.send(userFansList);
		res.render('fansList.html', { userFansList: userFansList });
	});

	// need fansList.html
	// res.send('fans list page .html');
};