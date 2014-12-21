var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('cookie-session'),
  controllers = require('./controllers'),
  app = express();

// view engine setup
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  key: 'sessionId',
  secret: 'session_cookie_secret+sdjfiawe958723',
  cookie: {
    maxAge: 1000 * 60
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', controllers.root);
app.use('/test', controllers.test);
app.use('/auth', controllers.auth);
app.use('/users', controllers.users);
app.use('/fans', controllers.fans);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;