let startTime;
let elapsedTime = 0;
let timerInterval;
let lapNumber = 1;

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    toggleButtons(true);
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    toggleButtons(false);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = Date.now();
    updateDisplay();
    toggleButtons(false);
    lapNumber = 1;
    clearLapTimes();
}

function recordLap() {
    const lapTime = getFormattedTime(elapsedTime);
    const lapList = document.getElementById('lap-times');
    const listItem = document.createElement('li');
    listItem.textContent = `Lap ${lapNumber++}: ${lapTime}`;
    lapList.appendChild(listItem);
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = getFormattedTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function toggleButtons(running) {
    document.querySelector('button:nth-child(1)').disabled = running;
    document.querySelector('button:nth-child(2)').disabled = !running;
}

function clearLapTimes() {
    const lapList = document.getElementById('lap-times');
    lapList.innerHTML = '';
}

function getFormattedTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button:nth-child(1)').addEventListener('click', startStopwatch);
    document.querySelector('button:nth-child(2)').addEventListener('click', pauseStopwatch);
    document.querySelector('button:nth-child(3)').addEventListener('click', resetStopwatch);
    document.querySelector('button:nth-child(4)').addEventListener('click', recordLap);
});
