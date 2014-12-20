module.exports = function (req, res, next){
	// console.log(req.session.user);
	// if(req.session.user && req.session.user.userId){
	// 	res.redirect('/fans/list');
	// 	return;
	// }
	req.session = null;
	res.render('login.html');
};