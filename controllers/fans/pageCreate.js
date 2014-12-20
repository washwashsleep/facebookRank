module.exports = function (req, res, next){
	if(!req.session.user || !req.session.user.userId){
		return res.redirect('/auth/login');
	}
	// need fansCreate.html
	res.render('fansCreate.html');
};