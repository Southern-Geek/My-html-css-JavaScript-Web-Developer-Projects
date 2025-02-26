// Select elements
const addTime = document.getElementById("add-time");
const subtractTime = document.getElementById("subtract-time");
const startTimer = document.getElementById("start-timer");
const stopTimer = document.getElementById("stop-timer");
const resetTimer = document.getElementById("reset-timer");
const loFiAlarm = document.getElementById("lo-fi-alarm");
const breakTime = document.getElementById("break-time");
const pauseDecrease = document.getElementById("pause-decrease");
const pauseIncrease = document.getElementById("pause-increase");
const currentTime = document.getElementById("current-time");

let isRunning = false;
let timeLength = 25;
let pauseLength = 5;
let timerTimeSeconds = timeLength * 60;
let pauseTimeSeconds = pauseLength * 60;
let isBreak = false;  
let interval;

// Functions:
const updateTimer = () => {
  const timerMinutes = Math.floor(timerTimeSeconds / 60);
  const timerSeconds = timerTimeSeconds % 60;
  currentTime.textContent = `${timerMinutes.toString().padStart(2, "0")}:${timerSeconds.toString().padStart(2, "0")}`;

  const pauseMin = Math.floor(pauseTimeSeconds / 60);
  const pauseSec = pauseTimeSeconds % 60;
  breakTime.textContent = `${pauseMin.toString().padStart(2, "0")}:${pauseSec.toString().padStart(2, "0")}`;
};

const runTimer = () => {
  if (timerTimeSeconds > 0) {
    timerTimeSeconds--;  
  } else if (!isBreak) {
   
    isBreak = true;
    timerTimeSeconds = pauseTimeSeconds;
    loFiAlarm.play();
  } else if (isBreak && timerTimeSeconds > 0) {
    timerTimeSeconds--;
  } else {

    isBreak = false;
    timerTimeSeconds = timeLength * 60;
    loFiAlarm.play();
  }
  updateTimer();
};

// Start Timer
const startTimerFunc = () => {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(runTimer, 1000); 
  }
};

// Stop Timer
const stopTimerFunc = () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  }
};

// Reset Timer
const resetTime = () => {
  clearInterval(interval);
  isRunning = false;
  isBreak = false;
  timeLength = 25;
  pauseLength = 5;
  timerTimeSeconds = timeLength * 60;
  pauseTimeSeconds = pauseLength * 60;
  updateTimer();
  loFiAlarm.pause();
  loFiAlarm.currentTime = 0;
};

// Event Listeners
subtractTime.addEventListener("click", () => {
  if (!isRunning && timeLength > 1) {
    timeLength--;
    timerTimeSeconds = timeLength * 60;
    updateTimer();
  }
});

addTime.addEventListener("click", () => {
  if (!isRunning && timeLength < 600) {
    timeLength++;
    timerTimeSeconds = timeLength * 60;
    updateTimer();
  }
});

pauseDecrease.addEventListener("click", () => {
  if (!isRunning && pauseLength > 1) {
    pauseLength--;
    pauseTimeSeconds = pauseLength * 60;
    updateTimer();
  }
});

pauseIncrease.addEventListener("click", () => {
  if (!isRunning && pauseLength < 600) {
    pauseLength++;
    pauseTimeSeconds = pauseLength * 60;
    updateTimer();
  }
});

startTimer.addEventListener("click", startTimerFunc);
stopTimer.addEventListener("click", stopTimerFunc);
resetTimer.addEventListener("click", resetTime);

updateTimer(); 
