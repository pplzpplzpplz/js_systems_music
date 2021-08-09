let audioContext = new AudioContext();

function startIt() {
  audioContext.resume();

// AUDIO 1
  function startLoop1(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let gainNode = audioContext.createGain();
    
    let randomStartPosition = Math.floor(Math.random() * 57.6);
    let offsetAmount = randomStartPosition;  
    console.log(`Audio 1 offset amount: ${offsetAmount} seconds`);

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

    sourceNode.connect(pannerNode);
    pannerNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    sourceNode.start(0, offsetAmount);  

  }

  fetch('1.wav') 
    .then(response => response.arrayBuffer()) 
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
    .then(audioBuffer => {
      startLoop1(audioBuffer, -1, 1);
    })
    .catch(error => console.error(error));


// AUDIO 2
  function startLoop2(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let gainNode = audioContext.createGain();
    
    let randomStartPosition = Math.floor(Math.random() * 57.6);
    let offsetAmount = randomStartPosition;  
    console.log(`Audio 2 offset amount: ${offsetAmount} seconds`);

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

    sourceNode.connect(pannerNode);
    pannerNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    sourceNode.start(0, offsetAmount);  
  }

  fetch('2.wav') 
    .then(response => response.arrayBuffer()) 
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
    .then(audioBuffer => {
      startLoop2(audioBuffer, 1, 1);
    })
    .catch(error => console.error(error));



// AUDIO 3
  function startLoop3(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let gainNode = audioContext.createGain();
    
    let randomStartPosition = Math.floor(Math.random() * 57.6);
    let offsetAmount = randomStartPosition;  
    console.log(`Audio 3 offset amount: ${offsetAmount} seconds`);

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(.4, audioContext.currentTime + 8);

    sourceNode.connect(pannerNode);
    pannerNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    sourceNode.start(0, offsetAmount);  
  }
  
  fetch('3.wav') 
    .then(response => response.arrayBuffer()) 
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
    .then(audioBuffer => {
      startLoop3(audioBuffer, 0, 1);
    })
    .catch(error => console.error(error));



// AUDIO 4
  function startLoop4(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let gainNode = audioContext.createGain();
    
    let randomStartPosition = Math.floor(Math.random() * 57.6);
    let offsetAmount = randomStartPosition;  
    console.log(`Audio 4 offset amount: ${offsetAmount} seconds`);

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

    sourceNode.connect(pannerNode);
    pannerNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    sourceNode.start(0, offsetAmount);  
  }
  fetch('4.wav') 
    .then(response => response.arrayBuffer()) 
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
    .then(audioBuffer => {
      startLoop4(audioBuffer, -1, 1);
    })
    .catch(error => console.error(error));
}


// PAUSE MUSIC
function pauseIt() {
  audioContext.suspend();
}