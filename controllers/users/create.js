var _ = require('lodash');
var async = require('async');

var db = require('../../models');

module.exports = function (req, res, next){
	
	async.waterfall([
		function (cb){
			
			var err;
			
			['id', 'name', 'first_name', 'last_name'].forEach(function (field){
				if(!req.body[field]){
					err = new Error('user create `' +field +'` required');
				}
				return;
			});
			
			if(err){
				return cb(err);
			}
			
			cb();
		},
		
		function (cb){

			var options = _.pick(req.body, ['name', 'first_name', 'last_name']);
			
			options.userId = req.body.id;
			
			options.picture = 'http: //graph.facebook.com/' + options.userId + 
			'/picture?width=30&height=30';
			
			cb(null, options);
		},
		
		function (options, cb){
			
			db.users.findOne({ userId: req.body.id}, function (err, aliveUser){
				if(!aliveUser){
					return cb(null, options);
				}
				
				req.session.user = aliveUser;
				res.send({
					session: req.session,
					status: 'session'
				});
			});
			return;
		},
		
		function (options, cb){
			
			db.users.insert(options, cb);
		},
	],
	function (err, newUser){
		if(err){
			return next(err);
		}
		req.session.user = newUser;
		res.send({
			session: req.session,
			status: 'nweUser'
		});
	});
};