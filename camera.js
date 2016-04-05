var raspicam = require('raspicam')

// Create a new raspicam instance
var camera = new Raspicam();

camera.start()

var cameraOptions = {
    width       : 600,
    height      : 338,
    mode        : "video",
    output      : 'images/camera.h264'
};

var camera = new require("raspicam")(cameraOptions);
camera.start();

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/images/camera.h264');
});
