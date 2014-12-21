var _ = require('lodash');
var async = require('async');
var request = require('request');

var db = require('../models');

module.exports = function (done){
	
	async.waterfall([
		function (cb){
			db.fans.find({}, cb);
		},
		
		function (fans, cb){
			async.eachLimit(fans, 10, function (fan, callback){
				async.waterfall([
					function (next){
						request('http://graph.facebook.com/' + fan.fanId, next);
					},
					function (res, body, next){
						if(res.statusCode !== 200){
							// console.log(body);
							return next(new Error('statusCode must be 200'));
						}
						// console.log(body);
						var info = {
							fanId: fan.fanId,
							likes: JSON.parse(body).likes,
							when: Date.now()
						};
						next(null, info);
					},
					function (info, next){
						db.fansUpdateInfo.findOne({ fanId: info.fanId }, function (err, aliveInfo){
							if(err){
								return callback(err);
							}

							if(!aliveInfo){
								db.fansUpdateInfo.insert({
									fanId: info.fanId,
									info: [{ likes: info.likes, when: info.when }]
								}, next);
								return;
							}

							db.fansUpdateInfo.update({ fanId: aliveInfo.fanId}, 
								{$push: { info: { likes: info.likes, when: info.when } } }, 
							next);
						});
					}
				], function (err, updateInfo){
					if(err){
						callback(err);
						return;
					}
					console.log(updateInfo);
					callback();
				});
			}, 
			cb);
		}
	],
	function (err){
		if(err){
			done(err);
		}
		done();
	});
};