module.exports = function (req, res, next){
	// res.send('This is new Home Page QOO');
	res.render('index.html', {test: '12345'});
};