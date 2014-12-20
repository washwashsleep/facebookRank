var mongojs = require('mongojs');
var db = mongojs('mongodb://128.199.223.114:27017/facebookRank');
var users = db.collection('users');


module.exports = {
	users: users
};