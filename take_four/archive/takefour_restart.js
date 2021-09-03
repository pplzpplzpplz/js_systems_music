// PLAY / PAUSE BUTTON
const playPauseButton = document.querySelector('.playpause');
const stopButton = document.querySelector('.stop');
const progressBar = document.querySelector('.progressbar');
let positionDiv = document.querySelector('.p1'); // grab the position line div




let counter = 0;

let pxWidth = progressBar.offsetWidth; // width of player container divs   


// web audio api 
// const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioOne = document.querySelector('audio');

let audioLength = audioOne.duration; // audio loop lengths in seconds
let offsetAmount = Math.random() * audioLength;  // random starting time for each audio
let percentageComplete = (offsetAmount / audioLength); // percentage of audio loop completed AT START
let pixelsCompleteOfDiv = Math.floor(percentageComplete * pxWidth); // pixel position of position line div AT START


const audioOneTrack = audioContext.createMediaElementSource(audioOne);
audioOneTrack.connect(audioContext.destination);

// play / pause audio 
playPauseButton.addEventListener('click', function() {

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
      audioContext.resume();
  }

  // play or pause track depending on state
  if (this.dataset.playing === 'false') {
      audioContext.currentTime = offsetAmount;
      audioOne.play();
      this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true') {
      audioOne.pause();
      this.dataset.playing = 'false';
  }

}, false);




// STOP BUTTON 
stopButton.addEventListener('click', stopIt);
audioOne.loop = true;

function stopIt() {
  audioOne.pause();
  audioOne.currentTime = 0;
}