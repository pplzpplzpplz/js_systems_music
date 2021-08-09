let audioContext = new AudioContext();


function startIt() {
  audioContext.resume();

  // LOOP THROUGH 1-4
  for (var i = 1; i < 5; i++) {

    // grab the div with class position
    let positionDiv = document.getElementsByClassName(`position${i}`);
    // console.log(`position${i}`);
    console.log(positionDiv)

    function startLoop(audioBuffer, pan = 0, rate = 1) {
      i = i + 1;

      // create audio nodes
      let sourceNode = audioContext.createBufferSource();
      let pannerNode = audioContext.createStereoPanner();
      let gainNode = audioContext.createGain();
      
      let audioLength = 57.6;
      let randomStartPosition = Math.floor(Math.random() * audioLength);
      let offsetAmount = randomStartPosition;  
      console.log(`Audio ${i -5} offset amount: ${offsetAmount} seconds`);

      // change the left position of the divs to match the random start positions
      let percentageComplete = (offsetAmount / audioLength);
      positionDiv[0].style.left = `${Math.floor(percentageComplete * 336)}px`;

      sourceNode.buffer = audioBuffer;
      sourceNode.loop = true;
      sourceNode.playbackRate.value = rate;
      pannerNode.pan.value = pan;

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      // fade audio in 
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 8);

      // connect nodes to one another
      sourceNode.connect(pannerNode);
      pannerNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      sourceNode.start(0, offsetAmount);  
    }

    fetch(`${i}.wav`) 
      .then(response => response.arrayBuffer()) 
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer)) 
      .then(audioBuffer => {
        startLoop(audioBuffer, 0, 2);
      })
      .catch(error => console.error(error));
  }

}

  // PAUSE MUSIC
  function pauseIt() {
    audioContext.suspend();
  }

  // stop music
  function stopIt() {
    window.location.reload();
  }