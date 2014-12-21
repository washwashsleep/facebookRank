var _ = require('lodash');
var async = require('async');
var request = require('request');

var db = require('../../models');

module.exports = function (req, res, next){
	
	async.waterfall([
		function (cb){
			db.fansUpdateInfo.findOne({fanId: req.params.id}, cb);
		}
	],
	function (err, doc){
		if(err){
			return next(err);
		}
		// res.send(doc);
		res.render('fanShow.html', {doc:doc});
	});
	// render fanShow.html
};