module.exports = function (req, res, next){
	if(req.session.user && req.session.user.userId){
		return res.redirect('/fans/list');
	}
	res.render('login.html');
};