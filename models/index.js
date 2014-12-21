var mongojs = require('mongojs'),
	db = mongojs('mongodb://128.199.223.114:27017/facebookRank'),
	users = db.collection('users'),
	userFansList = db.collection('userFansList'),
	fans = db.collection('fans'),
	fansUpdateInfo = db.collection('fansUpdateInfo');

module.exports = {
	users: users,
	userFansList: userFansList,
	fans: fans,
	fansUpdateInfo: fansUpdateInfo
};