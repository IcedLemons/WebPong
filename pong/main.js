// CONSTANT VARIABLES

// canvas variables
const WIDTH = 750;
const HEIGHT = 450;
let context;

// paddle variables
const paddleWidth = 10;
const paddleHeight = 70;
const paddleSpeed = 5;

// ball variables
const ballRadius = 10;
const angle = getRandomNumber(0, Math.PI * 2); // Random angle between 0 and 2*PI (360 degrees)
let ballSpeed = 2;

let paddleLeft = {
  x: 10,
  y: HEIGHT / 2 - 35,
  width: paddleWidth,
  height: paddleHeight,
  velocityY: 0
};

let paddleRight = {
  x: WIDTH - 20,
  y: HEIGHT / 2 - 35,
  width: paddleWidth,
  height: paddleHeight,
  velocityY: 0
};

let ball = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  radius: ballRadius,
  velocityX: Math.cos(angle) * ballSpeed,
  velocityY: Math.sin(angle) * ballSpeed
};

window.onload = function () {
  let canvas = document.getElementById('canvas');
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  context = canvas.getContext('2d');

  requestAnimationFrame(update);

  // Listen for input
  document.addEventListener('keydown', movePaddle);
};

function update() {
  requestAnimationFrame(update);

  // clear canvas
  context.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw left paddle
  context.fillStyle = '#fff';
  let paddleLeftY = paddleLeft.y + paddleLeft.velocityY;
  if (!outOfBounds(paddleLeftY)) {
    paddleLeft.y = paddleLeftY;
  }
  context.fillRect(
    paddleLeft.x,
    paddleLeft.y,
    paddleLeft.width,
    paddleLeft.height
  );

  // Draw right paddle
  let paddleRightY = paddleRight.y + paddleRight.velocityY;
  if (!outOfBounds(paddleRightY)) {
    paddleRight.y = paddleRightY;
  }
  context.fillRect(
    paddleRight.x,
    paddleRight.y,
    paddleRight.width,
    paddleRight.height
  );

  // Draw ball

  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fill();

  // Detect if ball hits top or bottom of canvas
  if (ball.y <= 8 || ball.y + ball.radius >= HEIGHT) {
    ballSpeed *= 1.5;
    ball.velocityY *= -1;
  }

  // check if collision happens
  if (detectCollision(ball, paddleLeft)) {
    ballSpeed *= 1.5;
    if (ball.x - 80 <= paddleLeft.x) {
      ball.velocityX *= -1;
    }
  } else if (detectCollision(ball, paddleRight)) {
    ballSpeed += 1;
    if (ball.x + 50 >= paddleRight.x) {
      ball.velocityX *= -1;
    }
  }
}

function outOfBounds(yPosition) {
  return yPosition < 0 || yPosition + paddleHeight > HEIGHT;
}

function movePaddle(e) {
  // left paddle
  if (e.code == 'KeyW') {
    paddleLeft.velocityY = -paddleSpeed;
  } else if (e.code == 'KeyS') {
    paddleLeft.velocityY = paddleSpeed;
  }

  // right paddle
  if (e.code == 'ArrowUp') {
    paddleRight.velocityY = -paddleSpeed;
  } else if (e.code == 'ArrowDown') {
    paddleRight.velocityY = paddleSpeed;
  }

  // Stop paddles when corresponding keys are released
  document.addEventListener('keyup', function (event) {
    if (event.code == 'KeyW' || event.code == 'KeyS') {
      paddleLeft.velocityY = 0;
    } else if (event.code == 'ArrowUp' || event.code == 'ArrowDown') {
      paddleRight.velocityY = 0;
    }
  });
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.radius > b.x &&
    a.y < b.y + b.height &&
    a.y + a.radius > b.y
  );
}
