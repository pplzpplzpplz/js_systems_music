// PLAY / PAUSE BUTTON
const playpauseButton = document.querySelector('.playpause');
playpauseButton.addEventListener('click', (e)=>{
  startIt();
  e.target.classList.toggle('pause');
  if (!e.target.classList.contains('pause')) {
    pauseIt();
  }
})

// count how many times the playpause button is clicked
let counter = 0;
playpauseButton.addEventListener('click', (e)=>{
  counter++;
});


// STOP BUTTON 
const stopButton = document.querySelector('.stop');
stopButton.addEventListener('click', stopIt);


// AUDIO STUFF 
let audioContext = new AudioContext();


function startIt() {
  audioContext.resume();

  // LOOP THROUGH 1-4
  for (var i = 1; i < 5; i++) {

    // grab the div with class position
    let positionDiv = document.getElementsByClassName(`position${i}`);
    // console.log(positionDiv)

    function startLoop(audioBuffer, pan = 0, rate = 1) {
      i = i + 1;

      // create audio nodes
      let sourceNode = audioContext.createBufferSource();
      let pannerNode = audioContext.createStereoPanner();
      let gainNode = audioContext.createGain();
      
      let audioLength = 57.6;
      let randomStartPosition = Math.random() * audioLength;
      let offsetAmount = randomStartPosition;  
      let percentageComplete = (offsetAmount / audioLength);
      let pixelsCompleteOfDiv = Math.floor(percentageComplete * 336);

      if (playpauseButton.classList.contains('pause') && counter < 2) {
        console.log(`Audio ${i -5} offset amount: ${offsetAmount} seconds`);

        // change the positions divs to match the random start positions
        positionDiv[0].style.left = `${pixelsCompleteOfDiv}px`;
        console.log(pixelsCompleteOfDiv);
      } else {return}


      // every second, change the position divs to match the currentTime
      setInterval(updatePositionDiv, 1000);
      function updatePositionDiv() {
        let positionDivPixels = (((audioContext.currentTime + offsetAmount) / audioLength) * 336);
        if (positionDivPixels > 336) {
          positionDiv[0].style.left = `0px`;
        } else {
        positionDiv[0].style.left = `${positionDivPixels}px`;
        }
      }


      sourceNode.buffer = audioBuffer;
      sourceNode.loop = true;
      sourceNode.playbackRate.value = rate;
      pannerNode.pan.value = pan;

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      // fade audio in 
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

      // connect nodes to one another
      sourceNode.connect(pannerNode);
      pannerNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      sourceNode.start(0, offsetAmount);  

    }

    fetch(`${i}.wav`) 
      .then(response => response.arrayBuffer()) 
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
      .then(audioBuffer => {
        startLoop(audioBuffer, 0, 2);
      })
      .catch(error => console.error(error));
  }
  
}



  // PAUSE MUSIC
  function pauseIt() {
    audioContext.suspend();
  }

  // STOP MUSIC
  function stopIt() {
    window.location.reload();
  }