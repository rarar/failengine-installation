let express = require('express');
let https = require('https');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let url = '';
  let scores;
  let count = 0;
  let newVidCall = true;
  let firstLoad = true;
  let facesArray = [':(', ':/', ':|', ':)', ':D'];


  let makeGetRequest = () => {
    https.get('https://failengine.com/api/happiness', (resp) => {
      resp.on('data', (data) => {
        url = JSON.parse(data).mp4;
        scores = JSON.parse(data).scores;
        if (firstLoad) {
          // first time the page loads
          // page should render and new video should play
          console.log("first time loading");
          res.render('index', {
            title: 'Fail Engine',
            url: url
          });
          console.log(scores);
          console.log(count);
          firstLoad = false;
          //  timeInterval();

        }

        // TO DO:
        // Load next video and restart timer
        console.log("new vid call");
        console.log("new url")
        newVidCall = false;

      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    });

  };

  makeGetRequest();

  let timeInterval = setInterval(() => {
    console.log("log next score");
    console.log("scores[" + count + "] = " + scores[count]);
    let face;
    switch (Math.abs(scores[count])) {
      case scores[count] <= 0.2:
        face = facesArray[0];
        break;
      case scores[count] > 0.2 && scores[count] <= 0.4:
        face = facesArray[1];
        break;
      case scores[count] > 0.4 && scores[count] <= 0.6:
        face = facesArray[2];
        break;
      case scores[count] > 0.6 && scores[count] <= 0.8:
        face = facesArray[3];
        break;
      case scores[count] > 0.8 && scores[count] <= 1:
        face = facesArray[4];
        break;
      default:
        face = facesArray[2];
        break;
    }

    // TO DO: make sure face can be displayed on the client
    //document.getElementById('face').textContent = face;

    count += 1;

    if (count >= scores.length) {
      newVidCall = true;
      clearInterval(timeInterval);
      // make new get request
      makeGetRequest();
    }
  }, 500);

});


module.exports = router;
