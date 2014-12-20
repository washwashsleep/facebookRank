module.exports = function (req, res, next){
	// res.send('This is new Home Page QOO');
	res.render('test.html', {test: 'QQ'});
};