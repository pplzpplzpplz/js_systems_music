// const { Chebyshev } = require("tone");

let audioContext = new AudioContext();
const playStopButton = document.querySelector('.playstop');
const debugDiv = document.querySelector('.debugDiv');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const p3 = document.querySelector('.p3');
const p4 = document.querySelector('.p4');
const loadprogressDiv = document.querySelector('.loadprogress');


// tone.js - new Buffer for audio file, to grab duration
const buffer1 = new Tone.Buffer("op1.wav");
const buffer2 = new Tone.Buffer("op2.wav");
const buffer3 = new Tone.Buffer("op3.wav");
const buffer4 = new Tone.Buffer("1c.wav");

// tone.js effects
const feedbackDelay = new Tone.FeedbackDelay(10, 0.6).toDestination();
const pingPong = new Tone.PingPongDelay(.14, 0.1).toDestination();
const freeverb = new Tone.Freeverb().toDestination();
const cheby = new Tone.Chebyshev(100).toDestination();
const pitchShift = new Tone.PitchShift(24).toDestination();
const autoFilter = new Tone.AutoFilter("2n").toDestination().start();

pitchShift.wet.value = .25;
// pitchShift.pitch.value = -24;

freeverb.dampening = 250;

freeverb.wet.value = 1;

// setInterval(() => {
//   freeverb.wet.value = Math.random() * 1;
// }, 200);

freeverb.roomSize.linearRampToValueAtTime(.5, 4);



// players
const player1 = new Tone.Player(buffer1).connect(cheby).connect(feedbackDelay).connect(pingPong).connect(freeverb).connect(pitchShift).connect(autoFilter).toDestination();
const player2 = new Tone.Player(buffer2).connect(cheby).connect(feedbackDelay).connect(pingPong).connect(freeverb).connect(pitchShift).connect(autoFilter).toDestination();
const player3 = new Tone.Player(buffer3).connect(cheby).connect(feedbackDelay).connect(pingPong).connect(freeverb).connect(pitchShift).connect(autoFilter).toDestination();
const player4 = new Tone.Player(buffer4).toDestination();





// TO DO - TO EXPLORE 
// reverse
// playbackRate
// feedbackdelay = p cool
// autoFilter - meh










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
  loadprogressDiv.innerHTML = 'loading...';

  function loadingState() {
    setInterval(function() {
    if (loadprogressDiv.innerHTML === 'loading...') {
      loadprogressDiv.innerHTML = 'loading.';
    } else if (loadprogressDiv.innerHTML === 'loading.') {
      loadprogressDiv.innerHTML = 'loading..';
    } else if (loadprogressDiv.innerHTML === 'loading..') {
      loadprogressDiv.innerHTML = 'loading...';
    }
  }, 500);
}

loadingState();


  Tone.loaded().then(() => {
    loadprogressDiv.innerHTML = 'loaded!';
    setTimeout(() => {loadprogressDiv.innerHTML = ''}, 1000);

    // AUDIO 1 --------------------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition1 = Math.random() * buffer1.duration;
    
    player1.fadeIn = .1;
    player1.fadeOut = .1;
    player1.loop = true;
    player1.playbackRate = .75;
    player1.reverse = true;
    player1.start();
    Tone.Transport.start();
    

    // seek to the random start position
    player1.seek(randomStartPosition1);    

    setInterval(function() {
      // find the current position of the track 
      let currentPosition1 = (randomStartPosition1 + Tone.Transport.seconds) % buffer1.duration;

      // move the line with the audio playback
      p1.style.left = `${((currentPosition1 / buffer1.duration) * 100)}%`;

      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition1 >= buffer1.duration -.01) {
        p1.style.transition = 'none';
      }

      debugDiv.innerHTML = `
      <strong><u>DEBUG</u></strong> <br>
      randomStartPosition1:  ${randomStartPosition1.toFixed(1)}
      <br> 
      buffer1.duration: ${buffer1.duration} <br>
      currentPosition1: ${currentPosition1.toFixed(1)}
      reverb: ${freeverb.wet.value.toFixed(2)} <br>
      cheby: ${cheby.order.value} <br>
      `;
    });
    // AUDIO 1 ----------------END----------------



    // AUDIO 2 --------------------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition2 = Math.random() * buffer2.duration;
    
    player2.fadeIn = .1;
    player2.fadeOut = .1;
    player2.loop = true;
    player2.playbackRate = .75;
    player2.reverse = true;
    player2.start();

    // seek to the random start position
    player2.seek(randomStartPosition2);


    setInterval(function() {
      // find the current position of the track 
      let currentPosition2 = (randomStartPosition2 + Tone.Transport.seconds) % buffer2.duration;

      // move the line with the audio playback
      p2.style.left = `${((currentPosition2 / buffer2.duration) * 100)}%`;
      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition2 >= buffer2.duration -.01) {
        p2.style.transition = 'none';
      }
    });
    // AUDIO 2 ----------------END----------------


    // AUDIO 3 --------------------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition3 = Math.random() * buffer3.duration;
    
    player3.fadeIn = .1;
    player3.fadeOut = .1;
    player3.loop = true;
    player3.playbackRate = .75;
    // player3.reverse = true;
    player3.start();

    // seek to the random start position
    player3.seek(randomStartPosition3);


    setInterval(function() {
      // find the current position of the track 
      let currentPosition3 = (randomStartPosition3 + Tone.Transport.seconds) % buffer3.duration;

      // move the line with the audio playback
      p3.style.left = `${((currentPosition3 / buffer3.duration) * 100)}%`;
      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition3 >= buffer3.duration -.01) {
        p3.style.transition = 'none';
      }
    });
    // AUDIO 3 ----------------END----------------


    // AUDIO 4 --------------------------------
    // pick a random start time within the duration of the audio file
    randomStartPosition4 = Math.random() * buffer4.duration;
    
    player4.fadeIn = .1;
    player4.fadeOut = .1;
    player4.loop = true;
    player4.playbackRate = .75;
    player4.reverse = true;
    player4.volume.value = -10;
    player4.start();

    // seek to the random start position
    player4.seek(randomStartPosition4);


    setInterval(function() {
      // find the current position of the track 
      let currentPosition4 = (randomStartPosition4 + Tone.Transport.seconds) % buffer4.duration;

      // move the line with the audio playback
      p4.style.left = `${((currentPosition4 / buffer4.duration) * 100)}%`;
      // turn off transition so it jumps right back to 0 immediately
      if (currentPosition4 >= buffer4.duration -.01) {
        p4.style.transition = 'none';
      }
    });
    // AUDIO 4 ----------------END----------------




  });
}

function stopIt() {
  player1.stop();
  Tone.Transport.stop();
  Tone.Transport.seconds = 0;
  randomStartPosition1 = 0;
  player1.seek(0);
}



