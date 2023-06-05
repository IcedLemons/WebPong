import Paddle from './Paddle.js';
import { createBall } from './Ball.js';

// CONSTANT VARIABLES
const WIDTH = 750;
const HEIGHT = 450;
let context;

let paddleLeft = new Paddle(10, HEIGHT / 2 - 35, 10, 70, HEIGHT);
let paddleRight = new Paddle(WIDTH - 20, HEIGHT / 2 - 35, 10, 70, HEIGHT);
let scoreLeft = 0;
let scoreRight = 0;
let ball = createBall(WIDTH, HEIGHT);

// Speed increment value
let SPEED_INCREMENT;

window.onload = function () {
  let user_diff_choice = prompt(
    'The ball speed will increase in each collision, how diffcult do want this to be(0-5):'
  );

  while (user_diff_choice == '' || user_diff_choice == null) {
    user_diff_choice = prompt(
      'The ball speed will increase in each collision, how diffcult do want this to be(0-5):'
    );
  }

  switch (parseInt(user_diff_choice)) {
    case 0:
      alert('hmmm...okay');
      SPEED_INCREMENT = 0.2;
      break;
    case 1:
      alert('Have fun!');
      SPEED_INCREMENT = 0.5;
      break;
    case 2:
      alert('Okay...I see you');
      SPEED_INCREMENT = 1;
      break;
    case 3:
      alert('Are you sure about this....Good luck');
      SPEED_INCREMENT = 1.3;
      break;
    case 4:
      alert('Almost impossible!');
      SPEED_INCREMENT = 1.5;
      break;
    case 5:
      alert('Impossible!');
      SPEED_INCREMENT = 2;
      break;
    default:
      alert('Unexpected answer. Setting difficulty level to default.');
      SPEED_INCREMENT = 0.2;
      break;
  }
  let canvas = document.getElementById('canvas');
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  context = canvas.getContext('2d');

  requestAnimationFrame(update);

  // Listen for input
  document.addEventListener('keydown', movePaddle);
  document.addEventListener('keyup', stopPaddle);
};

function update() {
  // clear canvas
  context.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw paddles
  paddleLeft.draw(context);
  paddleRight.draw(context);

  // Update paddles
  paddleLeft.update(context);
  paddleRight.update(context);

  // Draw ball
  ball.update();
  ball.draw(context);

  // Check for collisions
  if (detectCollision(ball, paddleLeft)) {
    if (ball.x - ball.radius <= paddleLeft.x + paddleLeft.width) {
      ball.velocityX *= -1;
      increaseBallSpeed();
    }
  } else if (detectCollision(ball, paddleRight)) {
    if (ball.x + ball.radius >= paddleRight.x) {
      ball.velocityX *= -1;
      increaseBallSpeed();
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

  requestAnimationFrame(update);
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

function resetBall() {
  ball = createBall(WIDTH, HEIGHT);
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.radius > b.x &&
    a.y < b.y + b.height &&
    a.y + a.radius > b.y
  );
}

function increaseBallSpeed() {
  // Increase ball speed by the speed increment value
  ball.velocityX += Math.sign(ball.velocityX) * SPEED_INCREMENT;
  ball.velocityY += Math.sign(ball.velocityY) * SPEED_INCREMENT;
}

export { WIDTH, HEIGHT };
