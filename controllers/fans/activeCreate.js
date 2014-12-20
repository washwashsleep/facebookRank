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
			req.body.fansIds = [138881822836993, 1502894619932654, 190423601015316];
			if(!req.body.fansIds){
				return cb(new Error('fans create `fansIds` required'));
			}
			
			if(!(req.body.fansIds instanceof Array)){
				return cb(new Error('fans create `fansIds` must be array'));
			}
			
			cb();
		},
		
		function (cb){
			db.userFansList.findOne({ userId: req.session.user.userId }, function (err, info){
				if(err){
					return cb(err);
				}
				
				if(!info){
					return cb(null, []);
				}
				
				cb(null, info.list);
			});
		},
		
		function (oldList, cb){
			
			var newList = _.union(oldList, req.body.fansIds);
			
			db.userFansList.update({userId: req.session.user.userId}, 
				{userId:req.session.user.userId, list: newList}, 
				{upsert: true},
				cb
			);
		},
		
		function (result, cb){
			db.userFansList.findOne({userId: req.session.user.userId}, cb);
		},
		
		function (fansList, cb){
			async.eachLimit(fansList.list, 20, function (fanId, callback){
				db.fans.findOne({ fanId: fanId}, function (err, result){
					if(err){
						return callback(err);
					}
					if(result){
						return callback();
					}
					
					var url = 'http://graph.facebook.com/' + fanId;
					request(url, function (err, res, body) {
						if(err){
							return callback(err);
						}
						if(res.statusCode !== 200){
							return callback(new Error('statusCode must be 200'));
						}
						
						var fansInfo = _.pick(JSON.parse(body), 'likes', 'name', 'link');
						fansInfo.fanId = fanId;
						fansInfo.image = 'http://graph.facebook.com/' + fanId + 
						'/picture?width=30&height=30';
						
						db.fans.insert(fansInfo, function (err, newFans){
							if(err){
								return callback(err);
							}
							callback();
						});
					});
				});
			}, cb);
		}
	],
	function (err){
		if(err){
			return next(err);
		}
		res.send('good');
		// res.redirect('/fans/list');
	});
};