function startIt() {
  let audioContext = new AudioContext();

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

    sourceNode.start(0, 2.98, 240);  // (when to start playing, offset at which to start playing the buffer, duration)
  }

  fetch('mydsn.mp3') 
    .then(response => response.arrayBuffer()) // here we choose an ArrayBuffer object as the response object
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) // turn the mp3 arrayBuffer into a decoded AudioBuffer
    .then(audioBuffer => {
      startLoop(audioBuffer, -.25, .8);
      startLoop(audioBuffer, .25, .805);
    })
    .catch(error => console.error(error)); // .catch is the rejection handler, only if there's an error during above process
}