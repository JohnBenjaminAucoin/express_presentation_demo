var createError = require('http-errors');
var express = require('express');
var path = require('path');

//Logging middleware
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addPostRouter = require('./routes/addPost');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

//Allows any request with carrying Json to be converted into a javascript object
app.use(express.json());

//middleware to handle url encoded strings
app.use(express.urlencoded({ extended: false }));

//middleware to serve static files ex: images css js
app.use(express.static(path.join(__dirname, 'public')));

//the last thing the middleware does is send it to be routed
app.use('/', indexRouter);
app.use('/addPost', addPostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/*
app.use(function(err, req, res, next) {
  res.render('error');
});

*/

module.exports = app;
