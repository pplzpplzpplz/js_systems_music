const SAMPLE_LIBRARY = {
  'Grand Piano': [
  { note: 'a', octave: '3', file: 'samples/LDFlute_susvib_A3_v1_1.wav' },
  { note: 'c', octave: '3', file: 'samples/LDFlute_susvib_C3_v1_1.wav' },
  { note: 'e', octave: '3', file: 'samples/LDFlute_susvib_E3_v1_1.wav' },
  { note: 'g', octave: '3', file: 'samples/LDFlute_susvib_G3_v1_1.wav' }
]
}

// the 12 possible semitones in major diatonic scale 
const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];


let audioContext = new AudioContext();


function fetchSample(path) {
  return fetch(encodeURIComponent(path))
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

// give the requested note a numerical value 
function noteValue(note, octave) {
  return octave * 12 + OCTAVE.indexOf(note);
}

// find distance between 2 notes 
function getNoteDistance(note1, octave1, note2, octave2) {
  return noteValue(note1, octave1) - noteValue(note2, octave2);
}

// find the sample that is closest to the requested note 
function getNearestSample(sampleBank, note, octave) {
  let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
    let distanceToA =
      Math.abs(getNoteDistance(note, octave, sampleA.note, sampleA.octave));
    let distanceToB =
      Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
    return distanceToA - distanceToB;
  });
  return sortedBank[0];
}

// if a flat is requested, convert it to the corresponding sharp 
function flatToSharp(note) {
  switch(note) {
    case 'Bb': return 'A#';
    case 'Db': return 'C#';
    case 'Eb': return 'D#';
    case 'Gb': return 'A#';
    case 'Ab': return 'G#';
    default: return note; 
  }
}

// fetch the nearest sample 
function getSample(instrument, noteAndOctave) {
  let [, requestedNote, requestedOctave] = /^(\w[b#]?)(\d)$/.exec(noteAndOctave);
  requestedOctave = parseInt(requestedOctave, 10);
  requestedNote = flatToSharp(requestedNote);
  let sampleBank = SAMPLE_LIBRARY[instrument];
  let sample = getNearestSample(sampleBank, requestedNote, requestedOctave);
  let distance = getNoteDistance(requestedNote, requestedOctave, sample.note, sample.octave);
  return fetchSample(sample.file).then(audioBuffer => ({
    audioBuffer: audioBuffer,
    distance: distance
  }));
}


function playIt() {
  // start the audio
  audioContext.resume();

  // play the nearest sample at the right 
  function playSample(instrument, note) {
    getSample(instrument, note).then(({audioBuffer, distance}) => {
      let playbackRate = Math.pow(2, distance / 12);
      let bufferSource = audioContext.createBufferSource();
      bufferSource.buffer = audioBuffer;
      bufferSource.playbackRate.value = playbackRate;
      bufferSource.connect(audioContext.destination);
      bufferSource.start();
    })
  }

  // test notes to play 
  setTimeout(() => playSample('Grand Piano', 'F1'),  1000);
  setTimeout(() => playSample('Grand Piano', 'Ab1'), 2000);
  setTimeout(() => playSample('Grand Piano', 'C2'),  3000);
  setTimeout(() => playSample('Grand Piano', 'Db2'), 4000);
  setTimeout(() => playSample('Grand Piano', 'Eb2'), 5000);
  setTimeout(() => playSample('Grand Piano', 'F2'),  6000);
  setTimeout(() => playSample('Grand Piano', 'Ab2'), 7000);

  
}

function pauseIt() {
  // pause the audio 
  audioContext.suspend();
}