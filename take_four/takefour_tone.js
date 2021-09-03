let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const currentTimeDiv = document.querySelector('.currentTime');
const p1 = document.querySelector('.p1');
const b1 = document.querySelector('.b1');


playStopButton.addEventListener('click', function() {
  // play or stop track depending on state
  if (this.dataset.playing === 'false') {
      startIt();
      console.log('playing');
      this.dataset.playing = 'true';

  } else if (this.dataset.playing === 'true') {
      // STOP MUSIC
      player.stop();
      Tone.Transport.stop();
      player.seek(0);
      console.log('stopped');
      this.dataset.playing = 'false';
  }
}, false);

  // tone.js - new Buffer for audio file, to grab duration
  var buffer = new Tone.Buffer("1.wav");
  // tone.js - new Player for audio file
  const player = new Tone.Player(buffer).toDestination();


function startIt() {

  Tone.loaded().then(() => {

    // pick a random start time within the duration of the audio file
    let randomStartPosition = Math.floor(Math.random() * (buffer.duration));
    

    player.fadeIn = 4;
    player.loop = true;
    player.playbackRate = 1;
    player.start();
    Tone.Transport.start();

    // seek to the random start position
    player.seek(randomStartPosition);

    console.log(`randomStartPosition: ${randomStartPosition}`);
    console.log(`Tone.Transport.seconds: ${Tone.Transport.seconds + randomStartPosition}`);

    let currentPosition = Tone.Transport.seconds + randomStartPosition;
    let playCount = 1;


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

      p1.style.left = `${currentPosition / p1.offsetWidth}%`;
      
      // if (currentPosition > buffer.duration) {
      //   console.log('reached end of track');
      //   currentPosition = 0;
      //   Tone.Transport.seconds = 0;
      //   currentPosition = Tone.Transport.seconds;
      // } else {
      //   console.log('else triggered');
      //   currentPosition = Tone.Transport.seconds;
      // }

      currentTimeDiv.innerHTML = `
      buffer.duration: ${buffer.duration} <br>
      randomStartPosition:  ${randomStartPosition} 
      <br> 
      Tone.Transport.seconds: ${currentPosition.toFixed(1)}
      <br>
      playCount: ${playCount}
      `;
    }), 1000;
  });



}


