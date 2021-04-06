var mode = 'pomodoro-time', isOn = false, breakLength = 5, currentTime = 0, minutes = 0, seconds = 0;

var pomoLength = 25; 

var audio = new Audio("./video/water5min.mp3");


window.onload = function() {
  
  document.getElementById('pomodoro-minus').onclick = function() {
    if (!isOn && (1 < pomoLength)) {
      pomoLength--;
      document.getElementById('pomodoro-val').innerHTML = pomoLength;
      resetTimer(mode, 'pomodoro-time');
    }
  }
  
  document.getElementById('pomodoro-plus').onclick = function() {
    if (!isOn && pomoLength < 60) {
      pomoLength++;
      document.getElementById('pomodoro-val').innerHTML = pomoLength;
      resetTimer(mode, 'pomodoro-time');
    }
  }

  document.getElementById('break-minus').onclick = function() {
    if (!isOn && (1 < breakLength)) {
      breakLength--;
      document.getElementById('break-val').innerHTML = breakLength;
      resetTimer(mode, 'break');
    }
  }
  
  document.getElementById('break-plus').onclick = function() {
    if (!isOn && breakLength < 30) {
      breakLength++;
      document.getElementById('break-val').innerHTML = breakLength;
      resetTimer(mode, 'break');
    }
  }
  
  document.getElementById('circle').onclick = function() {
    if (!isOn) {
      isOn = true;
      startTimer();
      if (mode == 'break') {
        audio.play();
      }
    } else {
      isOn = false;  
      stopTimer();
      audio.pause();
    }
  }
  
  document.getElementById('break-val').innerHTML = breakLength;
  document.getElementById('pomodoro-val').innerHTML = pomoLength;
  resetTimer(mode, 'pomodoro-time');


  function tick() {
    if (currentTime == 0) {
      stopTimer();
      audio.play();
      switchMode();
      startTimer();
    } else {
      currentTime--;
      minutes = parseInt(currentTime/60, 10);
      seconds = parseInt(currentTime%60, 10);
      updateTimeText();
    }
  }

  function updateTimeText() {
    if (minutes < 10 ) {
      minutes = '0' + minutes 
    } 
    if (seconds < 10) {
      seconds = '0' + seconds; 
    }
    document.querySelector('#timer-count').innerHTML = minutes + ':' + seconds;
  }

  function resetTimer(modeNow, modeTo) {
    if (modeNow == modeTo) {
      if (modeNow == 'pomodoro-time') {
        currentTime = pomoLength*60;
      } else {
        currentTime = breakLength*60;
      }
      document.querySelector('#timer-count').innerHTML = currentTime/60 + ':00';
    }
  }
  
  function switchMode() {
    if (mode == 'pomodoro-time') {
      mode = 'break';
      document.getElementById('timer-text').innerHTML = 'Break';
      resetTimer(mode, 'break');
    } else {
      mode = 'pomodoro-time';
      document.getElementById('timer-text').innerHTML = 'Session';
      resetTimer(mode, 'pomodoro-time');
    }
  }

    
  // call timerTick every second
  function startTimer() {
    Timer = setInterval(tick, 1000);
  }
  
  function stopTimer() {
    clearInterval(Timer);
  }
}