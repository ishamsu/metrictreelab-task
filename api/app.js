var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var bodyParser = require( 'body-parser' );


require('dotenv').config() // it's secret!!!
const {createuser,login,updateuser,deleteuser,getalldata} = require('./routes/user');
const {createdatabymasterid,getdatabymasterid,getuserbymasterid} = require('./routes/data');
const {verifyToken} = require('./middleware/auth');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({ extended: true,limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.route('/api/v1/users').post(createuser);
//login
app.route('/api/v1/users/login').post(login);
//update user
app.route('/api/v1/users/:id').put(verifyToken,updateuser); //its a private route
//delet user
app.route('/api/v1/users/:id').delete(verifyToken,deleteuser);
//getalluser
app.route('/api/v1/users').get(verifyToken,getalldata);


// data
app.route('/api/v1/data/:id').post(verifyToken,createdatabymasterid);
app.route('/api/v1/data/:id').get(verifyToken,getdatabymasterid);
app.route('/api/v1/user/:id').get(getuserbymasterid);






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

module.exports = app;
