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

    
    let positionDiv = document.getElementsByClassName(`p${i}`); // grab each position line div

    let audioLength = 57.6; // audio loop lengths in seconds
    let pxWidth = 336;     // width of player container divs
    let offsetAmount = Math.random() * audioLength;  // random starting time for each audio
    let percentageComplete = (offsetAmount / audioLength); // percentage of audio loop completed AT START
    let pixelsCompleteOfDiv = Math.floor(percentageComplete * pxWidth); // pixel position of position line div AT START
    

    function startLoop(audioBuffer, pan = 0, rate = 1) {
      i = i + 1;


      
      
      if (playpauseButton.classList.contains('pause') && (counter < 2)) {
        console.log(`Audio ${i-5} offset amount: ${offsetAmount} seconds`);
        console.log(`Audio ${i-5} pixels: ${pixelsCompleteOfDiv}px`);

        // every half second, change the position divs to match the currentTime
        setInterval(updatePositionDiv, 500);

        // FREDIE IDEAS
        // if audioContext.currentTime changes, update the position divs
        // bring in using audio html elements?
        // pull each audio individually
        // kill the setInterval, isntead use the 
        // 1 - create fetch for single audio file, put info in an array, console.log the stuff you need (duration, etc), get it to work
        // https://ourcodeworld.com/articles/read/1036/how-to-retrieve-the-duration-of-a-mp3-wav-audio-file-in-the-browser-with-javascript


        function updatePositionDiv() {
          let positionDivPixels = (((audioContext.currentTime + offsetAmount) / audioLength) * pxWidth);
          if (positionDivPixels > pxWidth) {
            // reset back to 0 position 
            positionDiv[0].style.left = `0px`;
            // get the new pixel position of the div
            positionDivPixels = positionDivPixels - pxWidth;
            positionDiv[0].style.left = `${positionDivPixels}px`;
            positionDivPixels = 0;
            return;
          } else {
          positionDiv[0].style.left = `${positionDivPixels}px`;
          return;
        }
          
        }
      } else {
        return;}


      // AUDIO PLAYBACK STUFF
      // create audio nodes
      let sourceNode = audioContext.createBufferSource();
      let pannerNode = audioContext.createStereoPanner();
      let gainNode = audioContext.createGain();
      

      sourceNode.buffer = audioBuffer;
      sourceNode.loop = true;
      sourceNode.playbackRate.value = rate;
      pannerNode.pan.value = pan;

      // start at 0 volume
      gainNode.gain.value = 0;
      // gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      
      // fade audio in 
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

      // connect nodes to one another
      sourceNode.connect(pannerNode);
      pannerNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      sourceNode.start(0, offsetAmount);  
      
    }


  }

  fetch(`1.wav`) 
  .then(response => response.arrayBuffer() ) 
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
  .then(audioBuffer => {
    startLoop(audioBuffer, 0, 4);
    // make empty array, push these results into an array
  })
  .catch(error => console.error(error));

  

  
}



  // PAUSE MUSIC
  function pauseIt() {
    audioContext.suspend();
  }

  // STOP MUSIC
  function stopIt() {
    window.location.reload();
  }