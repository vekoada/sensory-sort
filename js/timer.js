let startTime;
let timerInterval;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  return Math.floor((Date.now() - startTime) / 1000); // Returns total seconds
}

function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  document.getElementById("timeDisplay").textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(1);
  return `${minutes}:${seconds.padStart(4, "0")}`;
}

export { startTimer, stopTimer, formatTime };
