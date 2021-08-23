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

const progressBar = document.querySelector('.progressbar');



// AUDIO STUFF 
let audioContext = new AudioContext();
const audioOne = document.querySelector('audio');



function startIt() {
  audioContext.resume();

    let positionDiv = document.getElementsByClassName(`p1`); // grab each position line div

    let audioLength = audioOne.duration; // audio loop lengths in seconds
    let pxWidth = progressBar.offsetWidth; // width of player container divs   
    let offsetAmount = Math.random() * audioLength;  // random starting time for each audio
    let percentageComplete = (offsetAmount / audioLength); // percentage of audio loop completed AT START
    let pixelsCompleteOfDiv = Math.floor(percentageComplete * pxWidth); // pixel position of position line div AT START
    

    function startLoop(audioBuffer, pan = 0, rate = 1) {      
      
      if (playpauseButton.classList.contains('pause') && (counter < 2)) {

        console.log(`Audio 1 offset amount: ${offsetAmount} seconds`);
        console.log(`Audio 1 pixels: ${pixelsCompleteOfDiv}px`);


        
        // function updatePositionDiv() {
        //   let positionDivPixels = (((audioContext.currentTime + offsetAmount) / audioLength) * pxWidth);
        //   if (positionDivPixels > pxWidth) {
        //     // reset back to 0 position 
        //     positionDiv[0].style.left = `0px`;
        //     // get the new pixel position of the div
        //     positionDivPixels = positionDivPixels - pxWidth;
        //     positionDiv[0].style.left = `${positionDivPixels}px`;
        //     positionDivPixels = 0;
        //     return;
        //   } else {
        //   positionDiv[0].style.left = `${positionDivPixels}px`;
        //   return;
        //   }
        // }
        // updatePositionDiv();

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
      sourceNode.addEventListener('timeupdate', () => {
        console.log('The currentTime attribute has been updated. Again.');
      })
    }

    


    fetch(`1.wav`) 
      .then(response => response.arrayBuffer()) 
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
      .then(audioBuffer => {
        startLoop(audioBuffer, 0, 4);
      })
      .catch(error => console.error(error));

  
}

// audioOne.addEventListener('timeupdate', (event) => {
//   console.log('The currentTime attribute has been updated. Again.');
// });

  // PAUSE MUSIC
  function pauseIt() {
    audioContext.suspend();
  }

  // STOP MUSIC
  function stopIt() {
    window.location.reload();
  }