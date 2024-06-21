const emojis = ["❤️","❤️","😍","😍","😎","😎","🤣","🤣","✌️","✌️","😭","😭","💕","💕","😊","😊"];

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    timerInterval: null,
    timer: 60
};

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    game.timer = 60;
    initializeGame();
    showScore();
    startTimer();
}

function initializeGame() {
    createGameBoxes();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function startTimer() {
    let timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = game.timer;

    game.timerInterval = setInterval(() => {
        if (!isPaused) {
            game.timer--;
            timerDisplay.innerText = game.timer;

            if (game.timer === 0) {
                clearInterval(game.timerInterval);
                endGame();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(game.timerInterval);
}

let isPaused = false;

function pauseGame() {
    isPaused = !isPaused;
    if (isPaused) {
        stopTimer();
        document.getElementById('pause-button').textContent = 'Resume Game';
    } else {
        startTimer();
        document.getElementById('pause-button').textContent = 'Pause Game';
    }
}

function exitGame() {
    if (confirm('Are you sure you want to exit the game?')) {
        window.location.reload();
    }
}

function createGameBoxes() {
    const gameContainer = document.querySelector('.game');
    gameContainer.innerHTML = ''; // Clear existing boxes

    let shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    shuffledEmojis.forEach(emoji => {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = emoji;
        box.addEventListener('click', handleBoxClick);
        gameContainer.appendChild(box);
    });
}

function handleBoxClick() {
    this.classList.add('boxOpen');
    setTimeout(() => {
        let openBoxes = document.querySelectorAll('.boxOpen');
        if (openBoxes.length > 1) {
            if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                openBoxes.forEach(box => box.classList.add('boxMatch'));
                game.score++;
                showScore();
                if (game.score === emojis.length / 2) {
                    alert('Congratulations! You won!');
                    endGame();
                }
            } else {
                openBoxes.forEach(box => box.classList.remove('boxOpen'));
            }
        }
    }, 500);
}

function endGame() {
    alert('Game Over! Your final score is: ' + game.score);
    // Additional end game logic...
}

// Export only if using a module system (comment out if running directly in the browser)
// module.exports = { game, newGame, pauseGame };
