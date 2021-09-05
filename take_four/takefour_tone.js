let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const debugDiv = document.querySelector('.debugDiv');
const p1 = document.querySelector('.p1');
const b1 = document.querySelector('.b1');
let playCount;

// tone.js - new Buffer for audio file, to grab duration
var buffer = new Tone.Buffer("1b.wav");
// tone.js - new Player 
const player = new Tone.Player(buffer).toDestination();



playStopButton.addEventListener('click', function() {
  // PLAY OR STOP track depending on state
  if (this.dataset.playing === 'false') {
    // START MUSIC
    startIt();
    console.log('playing');
    this.dataset.playing = 'true';

  } else if (this.dataset.playing === 'true') {
    // STOP MUSIC
    location.reload(); // cant get the playCount to reset, so using page reload here
    stopIt();
    console.log('stopped');
    this.dataset.playing = 'false';
  }
}, false);


function startIt() {

  Tone.loaded().then(() => {

    // pick a random start time within the duration of the audio file
    randomStartPosition = Math.random() * (buffer.duration);
    
    player.fadeIn = .1;
    player.fadeOut = .1;
    player.loop = true;
    player.playbackRate = 1;
    player.start();
    Tone.Transport.start();

    // seek to the random start position
    player.seek(randomStartPosition);

    let currentPosition = Tone.Transport.seconds + randomStartPosition;
    playCount = 1;


    setInterval(function() {
      // song is less than one duration
      if (currentPosition < buffer.duration) {
        currentPosition = Tone.Transport.seconds + randomStartPosition;
      } 

      // song is more than one duration
      else if (currentPosition >= buffer.duration) {
        playCount = playCount + 1;
        randomStartPosition = 0;
        currentPosition = 0;
        Tone.Transport.seconds = 0;
      }

      // move the line with the audio playback
      p1.style.left = `${((currentPosition / buffer.duration) * 100)}%`;

      debugDiv.innerHTML = `
      <strong><u>DEBUG</u></strong> <br>
      randomStartPosition:  ${randomStartPosition.toFixed(1)}
      <br> 
      buffer.duration: ${buffer.duration} <br>
      currentPosition: ${Math.floor(currentPosition)}
      <br>
      playCount: ${playCount}
      <br>
      `;
    });
  });
}

function stopIt() {
  playCount = 0;
  player.stop();
  Tone.Transport.stop();
  Tone.Transport.seconds = 0;
  randomStartPosition = 0;
  player.seek(0);
}


