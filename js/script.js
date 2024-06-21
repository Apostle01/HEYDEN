const emojis = ["❤️","❤️","😍","😍","😎","😎","🤣","🤣","✌️","✌️","😭","😭","💕","💕","😊","😊"];

// Initialize game object with score and timer properties
let game = {
    score: 0,
    timer: 60, // Initial time in seconds
    timerInterval: null
};

// Function to start the timer
function startTimer() {
    let timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = game.timer;

    // Update the timer every second
    game.timerInterval = setInterval(() => {
        game.timer--;
        timerDisplay.innerText = game.timer;

        // End the game when the timer reaches 0
        if (game.timer === 0) {
            clearInterval(game.timerInterval);
            endGame();
        }
    }, 1000); // Update timer every 1000 milliseconds (1 second)
}

// Function to stop the timer
function stopTimer() {
    clearInterval(game.timerInterval);
}

// Function to initialize the game
function initializeGame() {
    game.score = 0;
    game.timer = 60; // Reset timer to initial value
    startTimer(); // Start the timer
    updateScore(); // Update the score display
}

// Function to update the score display
function updateScore() {
    let scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = game.score;
}

// Function to handle game end
function endGame() {
    alert('Game Over! Your final score is: ' + game.score);
    // Any additional logic for ending the game...
}

// Function to handle click on game box
function handleBoxClick() {
    this.classList.add('boxOpen');
    setTimeout(() => {
        let openBoxes = document.querySelectorAll('.boxOpen');
        if (openBoxes.length > 1) {
            if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                openBoxes.forEach(box => box.classList.add('boxMatch'));
                game.score++;
                updateScore();
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

// Function to create game boxes
function createGameBoxes() {
    let shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    let gameContainer = document.querySelector('.game');
    gameContainer.innerHTML = ''; // Clear existing boxes
    shuffledEmojis.forEach(emoji => {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = emoji;
        box.addEventListener('click', handleBoxClick);
        gameContainer.appendChild(box);
    });
}

let isPaused = false;

function pauseGame() {
    if (isPaused) {
        startTimer();
        document.querySelector('.game').classList.remove('paused');
        document.getElementById('pauseGame').textContent = 'Pause Game';
        isPaused = false;
    } else {
        stopTimer();
        document.querySelector('.game').classList.add('paused');
        document.getElementById('pauseGame').textContent = 'Resume Game';
        isPaused = true;
    }
}

function exitGame() {
    if (confirm('Are you sure you want to exit the game?')) {
        window.location.reload();
    }
}

// Example usage:
// Call initializeGame() function to start the game
initializeGame();
createGameBoxes();

document.getElementById('pauseGame').addEventListener('click', pauseGame);
document.getElementById('exitGame').addEventListener('click', exitGame);