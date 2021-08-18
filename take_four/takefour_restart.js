// PLAY / PAUSE BUTTON
const playPauseButton = document.querySelector('.playpause');
const stopButton = document.querySelector('.stop');
const progressBar = document.querySelector('.progressbar');
let positionDiv = document.querySelector('.p1'); // grab the position line div


const audioOne = document.querySelector('audio');

let counter = 0;

let audioLength = audioOne.duration; // audio loop lengths in seconds
let pxWidth = progressBar.offsetWidth; // width of player container divs   
let offsetAmount = Math.random() * audioLength;  // random starting time for each audio
let percentageComplete = (offsetAmount / audioLength); // percentage of audio loop completed AT START
let pixelsCompleteOfDiv = Math.floor(percentageComplete * pxWidth); // pixel position of position line div AT START

playPauseButton.addEventListener('click', (e)=>{
  counter++; // increment counter
  playIt();
  e.target.classList.toggle('pause'); // toggle pause class
  if (!e.target.classList.contains('pause')) {
    pauseIt();
  }
})




// STOP BUTTON 

stopButton.addEventListener('click', stopIt);
audioOne.loop = true;


// PLAY MUSIC
function playIt() {
  audioOne.currentTime = offsetAmount; // set audio current time to offset amount
  audioOne.play();
  
}

// PAUSE MUSIC
function pauseIt() {
  audioOne.pause();
}

// STOP MUSIC
function stopIt() {
  audioOne.pause();
  audioOne.currentTime = 0;
}