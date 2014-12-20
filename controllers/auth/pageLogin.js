module.exports = function (req, res, next){
	req.session = null;
	res.render('login.html');
};