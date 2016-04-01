var express = require('express');
var router = express.Router();

// // Setup websockets
// var http = require('http').Server(express);
// var webSocketServer = require('socket.io')(http); // Initalize new socket server to handle socket requests

router.get('/video', function(req, res){
  // res.render('hal/video');
  console.log(">>>>>>>>>>>>>> HERE ");
  console.log(res);
  res.io.emit("streamVideo", {hello: "World"});
});
//
// webSocketServer.on('connection', function(socket){
//   console.log("Socket connected!");
//   socket.on('stream video', function(){
//     console.log("Server response to stream video!");
//   });
// });

module.exports = router;
