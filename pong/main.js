// CONSTANT VARIABLES
const WIDTH = 750;
const HEIGHT = 450;
let context;

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityY = 0;
    this.paddleSpeed = 5; // Added paddleSpeed variable
  }

  draw() {
    context.fillStyle = '#fff';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    const newY = this.y + this.velocityY;
    if (!this.outOfBounds(newY)) {
      this.y = newY;
    }
  }

  moveUp() {
    this.velocityY = -this.paddleSpeed;
  }

  moveDown() {
    this.velocityY = this.paddleSpeed;
  }

  stop() {
    this.velocityY = 0;
  }

  outOfBounds(yPosition) {
    return yPosition < 0 || yPosition + this.height > HEIGHT;
  }
}

class Ball {
  constructor(x, y, radius, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.y <= this.radius || this.y + this.radius >= HEIGHT) {
      this.velocityY *= -1;
    }
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

let paddleLeft = new Paddle(10, HEIGHT / 2 - 35, 10, 70, 0);
let paddleRight = new Paddle(WIDTH - 20, HEIGHT / 2 - 35, 10, 70, 0);
let ball = createBall();

let scoreLeft = 0;
let scoreRight = 0;

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

  // Draw paddles
  paddleLeft.draw();
  paddleRight.draw();

  // Update paddles
  paddleLeft.update();
  paddleRight.update();

  // Draw ball
  ball.update();
  ball.draw();

  // Check for collisions
  if (detectCollision(ball, paddleLeft)) {
    if (ball.x - 80 <= paddleLeft.x) {
      ball.velocityX *= -1;
    }
  } else if (detectCollision(ball, paddleRight)) {
    if (ball.x + 50 >= paddleRight.x) {
      ball.velocityX *= -1;
    }
  }

  // Update scores
  if (ball.x - ball.radius <= 0) {
    scoreRight++;
    resetBall();
  } else if (ball.x + ball.radius >= WIDTH) {
    scoreLeft++;
    resetBall();
  }

  // Display scores
  context.font = '20px Arial';
  context.fillText('Left: ' + scoreLeft, 20, 30);
  context.fillText('Right: ' + scoreRight, WIDTH - 100, 30);
}

function movePaddle(e) {
  // left paddle
  if (e.code === 'KeyW') {
    paddleLeft.moveUp();
  } else if (e.code === 'KeyS') {
    paddleLeft.moveDown();
  }

  // right paddle
  if (e.code === 'ArrowUp') {
    paddleRight.moveUp();
  } else if (e.code === 'ArrowDown') {
    paddleRight.moveDown();
  }
}

function stopPaddle(e) {
  // left paddle
  if (e.code === 'KeyW' || e.code === 'KeyS') {
    paddleLeft.stop();
  }

  // right paddle
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
    paddleRight.stop();
  }
}

// Listen for input
document.addEventListener('keydown', movePaddle);
document.addEventListener('keyup', stopPaddle);

function resetBall() {
  ball = createBall();
}

function createBall() {
  const ballRadius = 10;
  const angle = getRandomNumber(0, Math.PI * 2);
  const ballSpeed = 4;
  const angleOffset = getRandomNumber(-1, 1); // Random angle offset to introduce variation
  const velocityX = Math.cos(angle + angleOffset) * ballSpeed;
  const velocityY = Math.sin(angle + angleOffset) * ballSpeed;

  return new Ball(WIDTH / 2, HEIGHT / 2, ballRadius, velocityX, velocityY);
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
