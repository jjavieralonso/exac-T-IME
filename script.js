const startButton = document.getElementById('startButton');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const attemptsElement = document.getElementById('attempts')
const resultElement = document.getElementById('result');

let animationFrameId;
let startTime;
var attempts = 0;
var stateGame = 0 // 0 = Juego sin iniciar/ 1 = Juego iniciado / 2 = Juego pausado, que se reinicia

function startPauseGame() {
    if (stateGame == 0) { // Juego al principio, sin iniciar
        startButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor"></path><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor"></path></svg>';
        stateGame = 1;
        if (startTime === undefined) {
            startTime = performance.now();
        }
        requestAnimationFrame(updateTimer);
    } else if (stateGame == 1) { // Juego iniciado
        startButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-repeat" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"></path><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"></path></svg>';
        stateGame = 2;
        cancelAnimationFrame(animationFrameId);
        attempts++;
        if (secondsElement.textContent !== '05' || millisecondsElement.textContent !== '00') {
            resultElement.textContent = 'Perdiste!';
            attemptsElement.textContent = attempts;
        } else{
            resultElement.textContent = 'Ganaste! en ' + attempts + (attempts === 1 ? ' intento.' : ' intentos.'); //si es 1 imprime intento, y sino intentos.
            attempts=0;
        }
        startTime = undefined;
    } else if (stateGame == 2) { // Juego listo para reiniciar.
        resetTimer();
        startButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" stroke-width="0" fill="currentColor"></path></svg>';
        resultElement.textContent = '';
        stateGame = 0;
    }
}

function updateTimer(currentTime) {
    const elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = Math.floor(elapsedTime % 1000);

    secondsElement.textContent = padTime(seconds);
    millisecondsElement.textContent = padTime(milliseconds);

    if (seconds >= 10) {
        stateGame == 2;
        resultElement.textContent = 'Perdiste!';
        startButton.textContent = 'Reiniciar';
        startButton.classList.remove('pause');
    } else {
        animationFrameId = requestAnimationFrame(updateTimer);
    }
}

function resetTimer() {
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
}

function padTime(value, digits = 2) { // Agrega ceros a la izquierda del tiempo
    let paddedValue = value.toString().padStart(digits, '0');
    if (paddedValue.length > digits) {
        paddedValue = paddedValue.slice(0, digits);
    }
    return paddedValue;
}
