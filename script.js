let startTime;
let lastLapTime = 0;
let elapsedTime = 0;
let timerInterval;
let themeInterval;
let themeIndex = 0;

function startStopwatch() {
    startTime = Date.now() - (lastLapTime || 0);
    timerInterval = setInterval(updateTime, 10);
    themeInterval = setInterval(updateTheme, 15000); // Update theme every 15 seconds
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    clearInterval(themeInterval);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    clearInterval(themeInterval);
    lastLapTime = 0;
    elapsedTime = 0;
    updateDisplay();
    updateAnalogClock(0, 0, 0);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
    const lapTime = elapsedTime - lastLapTime;
    lastLapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    document.getElementById('lapList').appendChild(lapItem);
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    updateAnalogClock(elapsedTime);
}

function setTimer() {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

    const totalTime = hours * 3600000 + minutes * 60000 + seconds * 1000;

    startTime = Date.now();
    lastLapTime = totalTime;
    elapsedTime = totalTime;
    updateDisplay();
    updateAnalogClock(totalTime);
    timerInterval = setInterval(updateTimer, 10);
    themeInterval = setInterval(updateTheme, 15000); // Update theme every 15 seconds
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    updateAnalogClock(elapsedTime);

    if (elapsedTime >= lastLapTime) {
        clearInterval(timerInterval);
        clearInterval(themeInterval);
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = true;
    }
}

function clearTimer() {
    clearInterval(timerInterval);
    clearInterval(themeInterval);
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
    resetStopwatch();
}

function updateTheme() {
    themeIndex++;
    if (themeIndex > 5) themeIndex = 1;

    switch (themeIndex) {
        case 1:
            document.body.classList.remove('light-yellow', 'light-black', 'dark-black');
            document.body.classList.add('light-blue');
            break;
        case 2:
            document.body.classList.remove('light-blue', 'light-black', 'dark-black');
            document.body.classList.add('light-yellow');
            break;
        case 3:
            document.body.classList.remove('light-blue', 'light-yellow', 'dark-black');
            document.body.classList.add('light-black');
            break;
        case 4:
            document.body.classList.remove('light-blue', 'light-yellow', 'light-black');
            document.body.classList.add('dark-black');
            break;
        case 5:
            document.body.classList.remove('light-blue', 'light-yellow', 'light-black');
            document.body.classList.add('dark-black');
            break;
    }
}

function updateAnalogClock(elapsedTime) {
    const hourDeg = (elapsedTime / 3600000) % 12 * 360 / 12;
    const minuteDeg = (elapsedTime / 60000) % 60 * 360 / 60;
    const secondDeg = (elapsedTime / 1000) % 60 * 360 / 60;

    document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
}

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime - hours * 3600000) / 60000);
    const seconds = Math.floor((elapsedTime - hours * 3600000 - minutes * 60000) / 1000);
    const milliseconds = elapsedTime - hours * 3600000 - minutes * 60000 - seconds * 1000;

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('milliseconds').textContent = String(milliseconds).padStart(3, '0');
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time - hours * 3600000) / 60000);
    const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000);
    const milliseconds = time - hours * 3600000 - minutes * 60000 - seconds * 1000;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

updateDisplay();
