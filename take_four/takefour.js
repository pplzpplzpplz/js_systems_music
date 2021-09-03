let audioContext = new AudioContext();
const playPauseButton = document.querySelector('.playpause');
const currentTimeDiv = document.querySelector('.currentTime');


playPauseButton.addEventListener('click', function() {
  // play or pause track depending on state
  if (this.dataset.playing === 'false') {
      startIt();
      console.log('playing');
      this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true') {
      pauseIt();
      console.log('paused');
      this.dataset.playing = 'false';
  }
}, false);

function startIt() {
  audioContext.resume();

  function startLoop1(audioBuffer, pan = 0, rate = 1) {

    let audio1Length = audioBuffer.duration;

    // choose a random starting position for the song
    let offsetAmount = Math.floor(Math.random() * audio1Length);
    console.log(`Audio 1 offset amount: ${offsetAmount} seconds`);

    // audio setup
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let gainNode = audioContext.createGain();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    // fade in audio
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

    // every second, print the currentTime
    setInterval(function() {
      currentTimeDiv.innerHTML = `Current time: ${Math.floor(audioContext.currentTime)}`;
    }, 1000);

    // audio routing
    sourceNode.connect(pannerNode);
    pannerNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    sourceNode.start(0, offsetAmount);  
  }

  fetch('1.wav') 
    .then(response => response.arrayBuffer()) 
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
    .then(audioBuffer => {
      startLoop1(audioBuffer, 0, 1);
    })
    .catch(error => console.error(error));

}


// PAUSE MUSIC
function pauseIt() {
  audioContext.suspend();
}