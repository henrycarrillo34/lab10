var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuariosRouter = require('./routes/usuarios');
var productosRouter = require('./routes/productos');
var empleadosRouter = require('./routes/empleados');

var app = express();

//conexion a BD
var mongoDB = 'mongodb://127.0.0.1:27017/utecdb';
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console,'Error de conexion MongoDB '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/empleados', empleadosRouter);

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
