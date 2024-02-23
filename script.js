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
let player1Score = document.getElementById("player1Score");
let player2Score = document.getElementById("player2Score");

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

// formula: v = sqrt ( Vx^2 + Vy^2 ) (pythagoras theorem) => to ensure smooth diagonal movement of elements

let Vx = 5;
let Vy = 10; // increase value to move faster, become positive to change direction
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

function reset() {
  ball.style.left = "50%";
  ball.style.left = "50%";
  Vx = -5;
  Vy = -10;
  V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
}

function checkCollision(activepaddle) {
  let balltop = ball.offsetTop;
  let ballbottom = ball.offsetTop + ball.offsetHeight;
  let ballleft = ball.offsetLeft;
  let ballright = ball.offsetLeft + ball.offsetWidth;

  let paddletop = activepaddle.offsetTop;
  let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
  let paddleleft = activepaddle.offsetLeft;
  let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;

  if (
    ballbottom > paddletop &&
    balltop < paddlebottom &&
    ballright > paddleleft &&
    ballleft < paddleright
  ) {
    return true;
  } else {
    return false;
  }
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
    player2Score.innerHTML = parseInt(player2Score.innerHTML) + 1; // +1 to player 2 score
    reset();
  }
  if (ball.offsetLeft > gameCanvas.offsetWidth - ball.offsetWidth) {
    player1Score.innerHTML = parseInt(player1Score.innerHTML) + 1; // +1 to player 1 score
    reset();
  }
  if (ball.offsetTop < 0) {
    Vy = -Vy; // top
  }
  if (ball.offsetTop > gameCanvas.offsetHeight - ball.offsetHeight) {
    Vy = -Vy; // bottom
  }
  // check collision
  let paddle;
  if (ball.offsetLeft < gameCanvas.offsetWidth / 2) {
    paddle = player1Paddle;
  } else {
    paddle = player2Paddle;
  }

  let ballcenterY = ball.offsetTop + ball.offsetHeight / 2;
  let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2;

  let angle = 0;

  if (checkCollision(paddle)) {
    if (paddle == player1Paddle) {
      if (ballcenterY < paddlecenterY) {
        angle = -Math.PI / 4; // ball will bounce 45 degree
      } else if (ballcenterY > paddlecenterY) {
        angle = Math.PI / 4;
      } else {
        angle = 0;
      }
    } else if (paddle == player2Paddle) {
      if (ballcenterY < paddlecenterY) {
        angle = (-3 * Math.PI) / 4; // ball will bounce 135 degree
      } else if (ballcenterY > paddlecenterY) {
        angle = (3 * Math.PI) / 4;
      } else {
        angle = 0;
      }
    }

    V = V + 0.2; // increases ball speed when there is a collision
    Vx = V * Math.cos(angle); // convert to degree
    Vy = V * Math.sin(angle);
  }

  // move ball
  ball.style.left = ball.offsetLeft + Vx + "px";
  ball.style.top = ball.offsetTop + Vy + "px";

  if (player1Score.innerHTML >= 10 || player2Score.innerHTML >= 10) {
    if (player1Score.innerHTML >= 10) {
      alert("Mission Completed. Player 1 wins!");
      location.reload();
    } else {
      alert("Mission Completed. Player 2 wins!");
      location.reload();
    }
  } else {
    requestAnimationFrame(gameLoop);
  }
}
gameLoop();

// things to do
// beautify css
// readme
// game instructions

// (if there's extra time)
// audio
// power-ups
