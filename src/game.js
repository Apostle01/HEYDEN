let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
};

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    initializeGame(); 
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

let isPaused = false;

function pauseGame() {
    isPaused = !isPaused;
    if (isPaused) {
        //Logic to pause the game (e.g., stop timers, disable interactions)
        document.getElementById('pause-button').textContent = 'Resume Game';
    } else {
        document.getElementById('pause-button').textContent = 'Pause Game';
    }
}

module.exports = { game, newGame };