// when the 'start' button is clicked, hide startScreen and show gameCanvas
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
});

let player1Paddle = document.getElementById("player1Paddle");
let player2Paddle = document.getElementById("player2Paddle");
let ball = document.getElementById("ball");
let gameCanvas = document.getElementById("gameCanvas");
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

// keyboard controls
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

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
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  } else if (event.key === "w") {
    wPressed = true;
  } else if (event.key === "s") {
    sPressed = true;
  }
}

function handleKeyUp(event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  } else if (event.key === "w") {
    wPressed = false;
  } else if (event.key === "s") {
    sPressed = false;
  }
}

// update position of ball by adding velocity to the position of the ball
// check if ball is hitting the wall or paddle

// formula: v = sqrt ( Vx^2 + Vy^2 ) (pythagoras theorem)

let Vx = -2;
let Vy = -3; // increase value to move faster, become positive to change direction
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

function reset() {
  ball.style.left = "50%";
  ball.style.left = "50%";
  Vx = -2;
  Vy = -3;
  V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
}

function gameLoop() {
  // move paddle
  if (upPressed && player2Paddle.offsetTop > 60) {
    player2Paddle.style.top = player2Paddle.offsetTop - 5 + "px"; // moves up by 5px each time when key is pressed
  }
  if (
    downPressed &&
    player2Paddle.offsetTop <
      gameCanvas.offsetHeight - player2Paddle.offsetHeight + 35
  ) {
    player2Paddle.style.top = player2Paddle.offsetTop + 5 + "px"; // moves down by 5px each time when key is pressed
  }
  if (wPressed && player1Paddle.offsetTop > 60) {
    player1Paddle.style.top = player1Paddle.offsetTop - 5 + "px";
  }
  if (
    sPressed &&
    player1Paddle.offsetTop <
      gameCanvas.offsetHeight - player1Paddle.offsetHeight + 35
  ) {
    player1Paddle.style.top = player1Paddle.offsetTop + 5 + "px";
  }

  // reflect ball or set ball to reset position
  if (ball.offsetLeft < 0) {
    reset();
  }
  if (ball.offsetLeft > gameCanvas.offsetWidth - ball.offsetWidth) {
    reset();
  }
  if (ball.offsetTop < 0) {
    Vy = -Vy; // top
  }
  if (ball.offsetTop > gameCanvas.offsetHeight - ball.offsetHeight) {
    Vy = -Vy; // bottom
  }

  // move ball
  ball.style.left = ball.offsetLeft + Vx + "px"; // keeps adding 1
  ball.style.top = ball.offsetTop + Vy + "px"; // keeps adding 5
  requestAnimationFrame(gameLoop);
}
gameLoop();

//
