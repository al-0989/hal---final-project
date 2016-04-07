var five = require("johnny-five");
var keypress = require("keypress"); // This package allows us to record keypress events

// Create new board object
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

  var waveServo = new five.Servo({ pin: 8, startAt: 0});
  var positionBig = 0;
  var positionSmall = 0;

  keypress(process.stdin);

  process.stdin.on('keypress', function(ch, key){
    if (positionBig <= 0 && key.name === "right" ){
      return true;
    }
    if (positionBig >= 180 && key.name === "left" ){
      return true;
    }
    if (positionSmall <= 0 && key.name === "down" ){
      return true;
    }
    if (positionSmall >= 180 && key.name === "up" ){
      return true;
    }

    console.log('got "keypress"!'+ key.name);
    // if (key && key.ctrl && key.name == 'c') {
    //   process.stdin.pause();
    // }

    if (key.name === "right") {
      console.log(key.name);
      console.log(positionBig);
      console.log(">>>>>>>>>>>>>>>>>>>>>");
      greenLed.on();
      positionBig -= 1;
      bigServo.to(positionBig);
      if (positionBig === 3){
        greenLed.on();
      }
    }

    if (key.name === "left"){
      console.log(key.name);
      console.log(positionBig);
      console.log(">>>>>>>>>>>>>>>>>>>>>");
      greenLed.off();
      positionBig += 1;
      bigServo.to(positionBig);
      if (positionBig === 177){
        greenLed.off();
      }
    }

    if (key.name === "down") {
      console.log(key.name);
      console.log(positionSmall);
      console.log(">>>>>>>>>>>>>>>>>>>>>");
      redLed.off();
      positionSmall -= 1;
      smallServo.to(positionSmall);
      if (positionSmall === 3){
        redLed.on();
      }
    }

    if (key.name === "up"){
      console.log(key.name);
      console.log(positionSmall);
      console.log(">>>>>>>>>>>>>>>>>>>>>");
      redLed.on();
      positionSmall += 1;
      smallServo.to(positionSmall);
      if (positionSmall === 177){
        redLed.off();
      }
    }
  });
  // waveServo.center();
  waveServo.sweep({range: [75, 110]});
  setTimeout(function(){waveServo.stop();
  waveServo.center();}, 5000);



  process.stdin.setRawMode(true);
  process.stdin.resume();

}); // End of myBoard
