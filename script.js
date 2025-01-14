let timer;
let isRunning = false;
let currentPhase = 'work';
let pomodorosCompleted = 0;
const initialWorkTime = 1500; // 25分 = 1500秒
// const initialWorkTime = 3; // 25分 = 1500秒
const initialongBreakTime = 900; // 15分
const initialshortBreakTime = 300; // 5分
// const initialshortBreakTime = 2; // 5分
let timeLeft = initialWorkTime; 

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
        nextPhase();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = initialWorkTime;
  // timeLeft = 10;
  currentPhase = 'work';
  updateDisplay(timeLeft);
}

function nextPhase() {
  // const startNext = false;
  const phaseDisplay = document.getElementById('phase');
  const completedPomodorosDisplay = document.getElementById('completedPomodoros');

  if (currentPhase === 'work') {
    pomodorosCompleted++;
    if (pomodorosCompleted % 4 === 0) {
      currentPhase = 'longBreak';
      timeLeft = initialongBreakTime; // 15分
      // phase
    } else {
      currentPhase = 'shortBreak';
      timeLeft = initialshortBreakTime; // 5分
    }
    // ストレッチリマインダー表示
    openPopup();
  } else {
    currentPhase = 'work';
    timeLeft = initialWorkTime; // 25分    
  }
  phaseDisplay.textContent = currentPhase;
  completedPomodorosDisplay.textContent = String(pomodorosCompleted);
  updateDisplay(timeLeft);
  isRunning = false;
  playNotification();
  // if (startNext){
  //   startTimer();
  // }
}

// タイマーの表示を更新する処理
function updateDisplay(timerValue) {
  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue % 60;
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  const timerDisplay = document.getElementById('time');
  
  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
  
  // updateProgressBar();
  
  // const count = document.querySelector('.pomodoro-count');
  // count.textContent = `Pomodoros: ${pomodoroCount}`;
}


function playNotification() {
  // 通知音を鳴らす処理
  const audio = new Audio("pointaccent.mp3");
  audio.play();
  // if (Notification.permission === "granted") {
  //   const notification = new Notification("タイトル", {
  //     body: "通知の本文",
  //     icon: "アイコンのURL"
  //   });
  //   notification.onclick = function() {
  //     console.log("通知がクリックされました");
  //   };
  // }
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// ポップアップ外をクリックしたときに閉じる
window.onclick = function(event) {
  if (event.target == document.getElementById("popup")) {
      closePopup();
  }
}


// Notification.requestPermission().then(function(permission) {
//   console.log(permission); // "granted", "denied", "default"
// });



