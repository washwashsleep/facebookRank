var _ = require('lodash');
var db = require('../../models');

module.exports = function (req, res, next){
	var options = _.pick(req.body, ['id', 'name']);
	db.test.insert(options, function (err, doc){
		if(err){
			next(err);
			return;
		}
		res.send(doc);
	});
};