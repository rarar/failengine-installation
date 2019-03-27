(function() {
  const facesArray = ['0x1F610', '0x1F928', '0x1F92D', '0x1F606', '0x1F923'];
  let timeInterval;
  let i;
  let video;
  let scores;
  let face;
  let loadVideo = (data) => {
    // set video to play
    console.log(data);
    i = 0;
    video = document.getElementById('video');
    video.src = data.mp4;
    video.addEventListener('loadeddata', () => {
      if (video.readyState >= 2) {
        scores = data.scores;
        // set the initial emoji
        face = pickTheRightFace(scores[i]);
        document.getElementById('face').textContent = String.fromCodePoint(face);
        i+=1;
        // start the 500ms timer
        timeInterval = setInterval(() => {
          console.log("log next score");
          console.log("scores[" + i + "] = " + scores[i]);

          face = pickTheRightFace(scores[i])
          document.getElementById('face').textContent = String.fromCodePoint(face);

          i+=1;

          if (i >= scores.length) {
            // make new get request
            console.log("resetting interval");
            clearInterval(timeInterval);
            i = 0;
            //makeRequest();
            reset();
          }
        }, 500);
      }
    });
  };

  let reset = ()=>{
    clearInterval(timeInterval);
    location.reload();
  }


  let makeRequest = ()=> {
    console.log("making request")

    // Set up our HTTP request
    let xhr = new XMLHttpRequest();

    // Setup our listener to process compeleted requests
    xhr.onreadystatechange = function() {

      // Only run if the request is complete
      if (xhr.readyState !== 4) return;

      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // What do when the request is successful
        loadVideo(JSON.parse(xhr.responseText));
      }

    };

    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', 'https://failengine.com/api/happiness');
    xhr.send();
  };

  let pickTheRightFace = (val)=>{
    console.log(face);
    console.log(val);
    if (val <= 0.2)
      face = facesArray[0];
    else if ((val > 0.2) && (val <= 0.4))
      face = facesArray[1];
    else if ((val > 0.4) && (val <= 0.6))
      face = facesArray[2];
    else if ((val > 0.6) && (val <= 0.8))
      face = facesArray[3];
    else if ((val > 0.8) && (val <= 1))
      face = facesArray[4];

    return face;
  }

  makeRequest();

}());
