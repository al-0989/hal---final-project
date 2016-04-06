var express = require('express');
var router = express.Router();
var five = require("johnny-five");
var socketStream = require('socket.io-stream')
var raspicam = require('raspicam');
var fs = require('fs');

// var app = express();
// // Setup websockets and stream
// var server = require('http').Server(app);
// var webSocketServer = require('socket.io')(server);

// var filename = '/public/images/sample.mp4';

var myBoard = new five.Board();

myBoard.on("ready", function(){

  // number here indicates the pin that the LED is connected to
  var greenLed = new five.Led(13);
  var redLed = new five.Led(12);

  // Make new servo
  var bigServo = new five.Servo({ pin: 10,
                                  startAt: 0
  });
  var smallServo = new five.Servo({ pin: 9,
                                    startAt: 0});
  var positionBig = 0;
  var positionSmall = 0;

  router.get('/video', function(req, res, next){
    // var ss = socketStream.createStream();

    // var cameraOptions = {
    //   mode        : "r",
    //   output      : 'images/camera.h264'
    // };
    // // Create a new raspicam instance
    // var camera = new raspicam(cameraOptions);

    res.io.on("connection",function(socket){
      socket.on("keyCodePress", function(data){
        if (positionBig <= 0 && data === 39 ){
          return true;
        }
        if (positionBig >= 180 && data === 37 ){
          return true;
        }
        if (positionSmall <= 0 && data === 40 ){
          return true;
        }
        if (positionSmall >= 180 && data === 38 ){
          return true;
        }

        if (data === 39) {
          positionBig -= 3;
          bigServo.to(positionBig);
          if (positionBig === 3){
            greenLed.on();
          }
        }

        if (data === 37 ){
          positionBig += 3;
          bigServo.to(positionBig);
          if (positionBig === 177){
            greenLed.off();
          }
        }

        if (data === 40) {
          positionSmall -= 5;
          smallServo.to(positionSmall);
          if (positionSmall === 3){
            redLed.on();
          }
        }

        if (data === 38){
          positionSmall += 5;
          smallServo.to(positionSmall);
          if (positionSmall === 177){
            redLed.off();
          }
        }
      }); // End of Socket keyCodePress

      // camera.start()
      // var stream = ss.createStream();
      // var filename = '/images/camera.h264';
      // ss(socket).emit("streamVideo", stream);
      // stream.pipe(fs.createWriteStream(filename));
    }); // End of Socket on connection
    res.render("hal/video");
  }); // End of router response

}); // End of board Setup

module.exports = router;
