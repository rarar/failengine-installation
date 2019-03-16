let express = require('express');
let https = require('https');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let url = '';

  https.get('https://failengine.com/api/happiness', (resp) => {
    resp.on('data', (data) => {
      console.log("hello??");
      console.log(JSON.parse(data).mp4);
      url = JSON.parse(data).mp4;
      console.log(url);

      res.render('index', {
        title: 'Fail Engine',
        url: url
      });


    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });



});

module.exports = router;
