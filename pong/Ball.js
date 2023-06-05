// Ball.js
class Ball {
  constructor(x, y, radius, velocityX, velocityY, canvasHeight) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.canvasHeight = canvasHeight;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (
      this.y <= this.radius ||
      this.y + this.radius >= this.canvasHeight
    ) {
      this.velocityY *= -1;
    }
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

export function createBall(canvasWidth, canvasHeight) {
  const ballRadius = 10;
  const xDirection = Math.random() > 0.5 ? 1 : -1; // Randomize the x-direction
  const angle = getRandomNumber(0, Math.PI / 6); // Angle range from 0 to 30 degrees
  const ballSpeed = 4;
  const velocityX = xDirection * ballSpeed;
  const velocityY = (Math.random() * 2 - 1) * ballSpeed; // Random variation in the y-direction

  return new Ball(
    canvasWidth / 2,
    canvasHeight / 2,
    ballRadius,
    velocityX,
    velocityY,
    canvasHeight
  );
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
