import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const otherPaddle = new Paddle(document.getElementById('other-paddle'));
const playerScore = document.getElementById('player-score');
const otherScore = document.getElementById('other-score');

const PADDLE_SPEED = 1;

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), otherPaddle.rect()]);
    // otherPaddle.update(delta, ball.y);

    if (isLose()) handleLose();
  }

  lastTime = time;
  updatePlayersPaddlePosition();
  window.requestAnimationFrame(update);
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else {
    otherScore.textContent = parseInt(otherScore.textContent) + 1;
  }
  ball.reset();
  otherPaddle.reset();
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

// Key Press //

let isMovingPlayerUp = false;
let isMovingPlayerDown = false;
let isMovingOtherUp = false;
let isMovingOtherDown = false;

document.addEventListener('keydown', e => {
  if (e.code === 'KeyW') {
    isMovingPlayerUp = true;
  }
  if (e.code === 'KeyS') {
    isMovingPlayerDown = true;
  }
  if (e.code === 'ArrowUp') {
    isMovingOtherUp = true;
  }
  if (e.code === 'ArrowDown') {
    isMovingOtherDown = true;
  }
});

document.addEventListener('keyup', e => {
  if (e.code === 'KeyW') {
    isMovingPlayerUp = false;
  }
  if (e.code === 'KeyS') {
    isMovingPlayerDown = false;
  }
  if (e.code === 'ArrowUp') {
    isMovingOtherUp = false;
  }
  if (e.code === 'ArrowDown') {
    isMovingOtherDown = false;
  }
});

function updatePlayersPaddlePosition() {
  // for player
  if (isMovingPlayerUp && playerPaddle.position > 1) {
    playerPaddle.position -= PADDLE_SPEED;
  }
  if (isMovingPlayerDown && playerPaddle.position < 89) {
    playerPaddle.position += PADDLE_SPEED;
  }

  // for other player
  if (isMovingOtherUp && otherPaddle.position > 1) {
    otherPaddle.position -= PADDLE_SPEED;
  }
  if (isMovingOtherDown && otherPaddle.position < 89) {
    otherPaddle.position += PADDLE_SPEED;
  }
}

window.requestAnimationFrame(update);
