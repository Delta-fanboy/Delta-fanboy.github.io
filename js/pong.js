// Pong game variables
let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

// Paddle variables
let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

// Score variables
let player1Score = 0;
let player2Score = 0;

// Function to calculate mouse position
function calculateMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

// Function to handle mouse movement
function handleMouseMovement(event) {
    let mousePos = calculateMousePos(event);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
}

// Function to draw the game canvas
function drawCanvas() {
    // Clear the canvas
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the left paddle
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // Draw the right paddle
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // Draw the ball
    canvasContext.fillStyle = 'white';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    canvasContext.fill();

    // Draw the score
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Player 1: ' + player1Score, 100, 100);
    canvasContext.fillText('Player 2: ' + player2Score, canvas.width - 200, 100);
}

// Function to initialize the game
function initializeGame() {
    // ...

    // Set up event listeners
    canvas.addEventListener('mousemove', handleMouseMovement);
    document.addEventListener('keydown', handleKeyboardMovement);

    // ...
}

// Function to update the game state
function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Reverse the ball's direction if it hits the top or bottom wall
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY *= -1;
    }

    // Reverse the ball's direction if it hits the left paddle
    if (ballX < PADDLE_THICKNESS && ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
        ballSpeedX *= -1;
    }

    // Reverse the ball's direction if it hits the right paddle
    if (ballX > canvas.width - PADDLE_THICKNESS && ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        ballSpeedX *= -1;
    }

    // Increment player 1's score if the ball hits the right wall
    if (ballX > canvas.width) {
        player1Score++;
        resetBall();
    }

    // Increment player 2's score if the ball hits the left wall
    if (ballX < 0) {
        player2Score++;
        resetBall();
    }
}

// Function to reset the ball position
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
    ballSpeedY = 4;
}

// Function to initialize the game
function initializeGame() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // Set up event listeners
    canvas.addEventListener('mousemove', handleMouseMovement);

    // Set the game update interval
    setInterval(function() {
        updateGame();
        drawCanvas();
    }, 1000 / 30); // 30 frames per second
}

// Call the initializeGame function when the window loads
window.onload = initializeGame;
