var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var stream = require('stream');
// var SerialPort = require("serialport").SerialPort
// var serialPort = new SerialPort("/dev/tty-usbserial1", {
//   baudrate: 57600
// });
var fs = require('fs');
var jsdom = require('jsdom');
var $ = require('jquery');

// Requiring the "controllers"
var routes = require('./routes/index');
var users = require('./routes/users');
var halCam = require('./routes/halCam');

var app = express();

// Setup websockets and stream
var server = require('http').Server(app);
var webSocketServer = require('socket.io')(server);
var socketStream = require('socket.io-stream')

var stream = socketStream.createStream();
var filename = '/public/images/sample.mp4';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware for setting up response through the webSocketServer
app.use(function(req, res, next){
  res.io = webSocketServer;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/hal',halCam);

// Setup the listener to respond to the webSocket call from the client
webSocketServer.on('connection', function(socket){
  // Function that receives the ready call from
  socket.on('connectionReady', function(data) {
    console.log(data);
    socket.emit('streamVideo', "Connection Established! ");
  //   // socketStream(socket).emit('streamVideo', "Connection Established! ");
  //   socketStream(socket).emit('streamVideo', )
  //   var stream = fs.createReadStream(__dirname + '/public/images/sample.mp4');
  //   stream.pipe(res);
  });
});

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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = {app: app, server: server};
