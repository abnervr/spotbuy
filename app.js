var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var home = require('./routes/home');
var spotifyoauth  = require('./routes/spotifyoauth');
var spotify = require('./routes/spotify');
var users = require('./routes/users');
var shirts = require('./routes/shirts');
var tickets = require('./routes/tickets');
var spotifyService = require('./services/spotify');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('bower_components'));
app.use((req, res, next) => {
  if (req.cookies.access_token && (!req.cookies.expires || req.cookies.expires <= new Date().getTime())) {
    spotifyService.updateAccessToken(req.cookies)
      .then((token) => {
        req.cookies.access_token = token.access_token;
        res.cookie('access_token', token.access_token);
        res.cookie('expires', new Date().getTime() + (token.expires_in * 1000));
        next();
      })
      .catch(() => {
        delete req.cookies.access_token;
        delete req.cookies.refresh_token;
        next();
      });
    return;
  }
  next();
});

app.use('/', routes);
app.use('/', spotify);
app.use('/home', home);
app.use('/spotifyoauth', spotifyoauth);
app.use('/users', users);
app.use('/shirts', shirts);
app.use('/tickets', tickets);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
