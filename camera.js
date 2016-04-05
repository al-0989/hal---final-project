var raspicam = require('raspicam')

// Create a new raspicam instance
var camera = new Raspicam();

camera.start()

var cameraOptions = {
    width       : 600,
    height      : 338,
    mode        : "video",
    awb         : 'cloud',
    output      : 'images/camera.jpg',
    q           : 50,
    rot         : 270,
    nopreview   : true,
    timeout     : 1000,
    timelapse   : 9999,
    th          : "0:0:0"
};

var camera = new require("raspicam")(cameraOptions);
camera.start();

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/images/camera.jpg');
});
