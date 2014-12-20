var mongojs = require('mongojs');
var db = mongojs('mongodb://128.199.223.114:27017/facebookRank');
var users = db.collection('users');
var userFansList = db.collection('userFansList');
var fans = db.collection('fans');


module.exports = {
	users: users,
	userFansList: userFansList,
	fans: fans
};