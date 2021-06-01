let audioContext = new AudioContext();

function startIt() {
  audioContext.resume();

  function startLoop(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 2.90;
    sourceNode.loopEnd = 4.78;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    
    sourceNode.start(0, 2.98, 640);  
  }

  fetch('mydsn.mp3') 
    .then(response => response.arrayBuffer()) 
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
    .then(audioBuffer => {
      startLoop(audioBuffer, -1, .8);
      startLoop(audioBuffer, 1, .9);
    })
    .catch(error => console.error(error));
}

function pauseIt() {
  audioContext.suspend();
}