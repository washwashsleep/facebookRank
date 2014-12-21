module.exports = function (req, res, next){
	// console.log(req.session.user);
	console.log(JSON.stringify(req.session));
	if(req.session.user && req.session.user.userId){
		res.redirect('/fans/list');
		return;
	}
	// req.session = null;
	res.render('login.html');
};