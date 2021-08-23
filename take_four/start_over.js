// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();



// get the audio element
const audioElement = document.querySelector('audio');
let audioLength = audioElement.duration; // audio loop lengths in seconds
let offsetAmount = Math.random() * audioLength;  // random starting time for each audio

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);



// select our play button
const playButton = document.querySelector('button');

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);



// PANNER node
const pannerOptions = { pan: 0 };
const pannerNode = new StereoPannerNode(audioContext);
pannerNode.pan.value = 0;

// GAIN node 
const gainNode = audioContext.createGain();
  // start at 0 volume
  gainNode.gain.value = 0;
  // fade audio in 
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

// connect nodes to one another
track.connect(pannerNode).connect(gainNode).connect(audioContext.destination);