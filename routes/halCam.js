var express = require('express');
var router = express.Router();

router.get('/video', function(req, res, next){
  res.io.emit("streamVideo", "In hal/video");
  res.render('hal/video');
});

module.exports = router;
