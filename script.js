// when the 'start' button is clicked, hide startScreen and show gameCanvas

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  init();
});

let player1Paddle, player2Paddle, ball;
let ballX = 250;
let ballY = 250;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

// initialization
function init() {
  player1Paddle = document.querySelector(".player1Paddle");
  player2Paddle = document.querySelector(".player2Paddle");
  ball = document.querySelector(".ball");

  resetGame(); // reset game and initialize variables

  document.addEventListener("keydown", handleKeyDown); // for keyboard controls

  gameLoop();
}

function resetGame() {
  // paddle positions
  player1Paddle.style.top = "250px";
  player2Paddle.style.top = "250px";

  // ball position
  ball.style.left = "calc(50% - 7.5px)";
  ball.style.top = "calc(50% - 7.5px)";

  // ball speed
  ballSpeedX = 5;
  ballSpeedY = 5;

  // player 1 and player 2 scores
  player1Score = 0;
  player2Score = 0;

  // set gameover status
  gameOver = false;
}

// keyboard controls
function handleKeyDown(event) {
  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "w" ||
    event.key === "s"
  ) {
    event.preventDefault(); // prevent scrolling with arrows
  }

  if (event.key === "ArrowUp") {
    movePlayer2PaddleUp();
  } else if (event.key === "ArrowDown") {
    movePlayer2PaddleDown();
  } else if (event.key === "w") {
    movePlayer1PaddleUp();
  } else if (event.key === "s") {
    movePlayer1PaddleDown();
  }
}

function movePlayer1PaddleUp() {
  let top = parseInt(player1Paddle.style.top) || 0;
  if (top > 0) {
    player1Paddle.style.top = top - 30 + "px";
  }
}

function movePlayer1PaddleDown() {
  let top = parseInt(player1Paddle.style.top) || 0;
  if (top < 520) {
    player1Paddle.style.top = top + 30 + "px";
  }
}

function movePlayer2PaddleUp() {
  let top = parseInt(player2Paddle.style.top) || 0;
  if (top > 0) {
    player2Paddle.style.top = top - 30 + "px";
  }
}

function movePlayer2PaddleDown() {
  let top = parseInt(player2Paddle.style.top) || 0;
  if (top < 520) {
    player2Paddle.style.top = top + 30 + "px";
  }
}

// update function
function update() {
  // move ball => x & y-axis. set speed.
  // move player paddle => based on arrow keys (up & down)
  // move computer paddle => if ball is above(below) centre, move paddle up(down). Set speed.
  // check for collision (collides with top/bottom or player1/player2 paddle => reflect ball)
  // check if ball goes out of bounds (left/right) => ++ player1/player2 score, reset ball position
  // check if game over (if computer/player score >= 10)

  moveBall();
  movePlayer1Paddle();
  movePlayer2Paddle();
  checkCollision();
  checkGameOver();
}

// move ball function
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

// check collision function
function checkCollision() {
  // check collision with top and bottom walls
  if (ballY <= 0 || ballY >= 580) {
    ballSpeedY = -ballSpeedY; // reverses vertical direction
  }

  // check collision with player paddles
  if (
    ballX <= 30 &&
    ballY >= parseInt(player1Paddle.style.top) &&
    ballY <= parseInt(player1Paddle.style.top) + 100
  ) {
    ballSpeedX = -ballSpeedX; // reverses horizontal direction
  }
}

// if game is not over => requestAnimationFrame function to schedule the next iteration of the game loop.
// if game is over => alert message (player or computer wins)

function gameLoop() {
  update();
  if (checkGameOver === false) {
    requestAnimationFrame(gameLoop);
  } else {
  }
  if (player1Score >= 10) {
    alert("mission success. player 1 wins!");
  } else {
    alert("mission success. player 2 wins!");
  }
}
