const emojis = ["❤️","❤️","😍","😍","😎","😎","🤣","🤣","✌️","✌️","😭","😭","💕","💕","😊","😊"];

// Initialize game object with score and timer properties
let game = {
    score: 0,
    timer: 60, // Initial time in seconds
    // Other properties...
};

// Function to start the timer
function startTimer() {
    let timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = game.timer;

    // Update the timer every second
    let timerInterval = setInterval(() => {
        game.timer--;
        timerDisplay.innerText = game.timer;

        // End the game when the timer reaches 0
        if (game.timer === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000); // Update timer every 1000 milliseconds (1 second)
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
    shuffledEmojis.forEach(emoji => {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = emoji;
        box.addEventListener('click', handleBoxClick);
        gameContainer.appendChild(box);
    });
}

// Example usage:
// Call initializeGame() function to start the game
initializeGame();
createGameBoxes();
