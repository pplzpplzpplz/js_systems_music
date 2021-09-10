let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const debugDiv = document.querySelector('.debugDiv');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
let playCount1;
let playCount2;

// tone.js - new Buffer for audio file, to grab duration
var buffer1 = new Tone.Buffer("1c.wav");
var buffer2 = new Tone.Buffer("1b.wav");
// tone.js - new Player 
const player1 = new Tone.Player(buffer1).toDestination();
const player2 = new Tone.Player(buffer2).toDestination();



playStopButton.addEventListener('click', function() {
  // PLAY OR STOP track depending on state
  if (this.dataset.playing === 'false') {
    // START MUSIC
    startIt();
    console.log('playing');
    this.dataset.playing = 'true';

  } else if (this.dataset.playing === 'true') {
    // STOP MUSIC
    location.reload(); // cant get the playCount1 to reset, so using page reload here
    // stopIt();
    // console.log('stopped');
    // this.dataset.playing = 'false';
  }
}, false);


function startIt() {

  Tone.loaded().then(() => {

    // AUDIO 1 --------------------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition1 = Math.random() * (buffer1.duration);
    
    player1.fadeIn = .1;
    player1.fadeOut = .1;
    player1.loop = true;
    player1.playbackRate = 1;
    player1.start();
    Tone.Transport.start();
    

    // seek to the random start position
    player1.seek(randomStartPosition1);

    let currentPosition1 = Tone.Transport.seconds + randomStartPosition1;
    playCount1 = 1;


    setInterval(function() {
      // song is less than one duration
      if (currentPosition1 < buffer1.duration) {
        currentPosition1 = Tone.Transport.seconds + randomStartPosition1;
      } 

      // song is more than one duration
      else if (currentPosition1 >= buffer1.duration) {
        playCount1 = playCount1 + 1;
        randomStartPosition1 = 0;
        currentPosition1 = 0;
        Tone.Transport.seconds = 0;
      }

      // move the line with the audio playback
      p1.style.left = `${((currentPosition1 / buffer1.duration) * 100)}%`;

      debugDiv.innerHTML = `
      <strong><u>DEBUG</u></strong> <br>
      randomStartPosition1:  ${randomStartPosition1.toFixed(1)}
      <br> 
      buffer1.duration: ${buffer1.duration} <br>
      currentPosition1: ${Math.floor(currentPosition1)}
      <br>
      playCount1: ${playCount1}
      <br>
      `;
    });
    // AUDIO 1 ----------------END----------------



    // // AUDIO 2 --------------------------------
    // // pick a random start time within the duration of the audio file
    // randomStartPosition2 = Math.random() * (buffer2.duration);
    
    // player2.fadeIn = .1;
    // player2.fadeOut = .1;
    // player2.loop = true;
    // player2.playbackRate = 1;
    // player2.start();
    // Tone.Transport.start();

    // // seek to the random start position
    // player2.seek(randomStartPosition2);

    // let currentPosition2 = Tone.Transport.seconds + randomStartPosition2;
    // playCount2 = 1;


    // setInterval(function() {
    //   // song is less than one duration
    //   if (currentPosition2 < buffer2.duration) {
    //     currentPosition2 = Tone.Transport.seconds + randomStartPosition2;
    //   } 

    //   // song is more than one duration
    //   else if (currentPosition2 >= buffer2.duration) {
    //     playCount2 = playCount2 + 1;
    //     randomStartPosition2 = 0;
    //     currentPosition2 = 0;
    //     // Tone.Transport.seconds = 0;
    //   }

    //   // move the line with the audio playback
    //   p2.style.left = `${((currentPosition2 / buffer2.duration) * 100)}%`;

    //   // debugDiv.innerHTML = `
    //   // <strong><u>DEBUG</u></strong> <br>
    //   // randomStartPosition2:  ${randomStartPosition2.toFixed(1)}
    //   // <br> 
    //   // buffer2.duration: ${buffer2.duration} <br>
    //   // currentPosition2: ${Math.floor(currentPosition2)}
    //   // <br>
    //   // playCount2: ${playCount2}
    //   // <br>
    //   // `;
    // });
    // // AUDIO 2 ----------------END----------------




  });
}

function stopIt() {
  playCount1 = 0;
  player1.stop();
  Tone.Transport.stop();
  Tone.Transport.seconds = 0;
  randomStartPosition1 = 0;
  player1.seek(0);
}



