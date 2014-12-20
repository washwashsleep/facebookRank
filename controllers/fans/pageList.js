module.exports = function (req, res, next){
	if(!req.session.user || !req.session.user.userId){
		return res.redirect('/auth/login');
	}
	// need fansList.html
	res.send('fans list page .html');
};