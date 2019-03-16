var express = require('express');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Fail Engine'
  });

  https.get('https://failengine.com/api/happiness', (resp) => {
    resp.on('data', (data) => {
      console.log("hello??");
      console.log(JSON.parse(data));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

});

module.exports = router;
