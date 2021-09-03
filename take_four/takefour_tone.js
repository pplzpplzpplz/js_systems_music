let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const currentTimeDiv = document.querySelector('.currentTime');


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



    setInterval(function() {
      let currentPosition = Tone.Transport.seconds;

      if (currentPosition > buffer.duration) {
        currentPosition = 0;
      }

      currentTimeDiv.innerHTML = `
      buffer.duration: ${buffer.duration} <br>
      randomStartPosition:  ${randomStartPosition} 
      <br> 
      Tone.Transport.seconds: ${Math.floor(currentPosition) + randomStartPosition}
      `;
    });
  });



}


