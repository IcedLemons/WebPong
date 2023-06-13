// This class represents the game Ball
class Ball {
  constructor(x, y, radius, velocityX, velocityY, canvasHeight) {
    // Initialize the ball's properties
    this.x = x; // x-coordinate of the ball
    this.y = y; // y-coordinate of the ball
    this.radius = radius; // radius of the ball
    this.velocityX = velocityX; // velocity in the x-direction
    this.velocityY = velocityY; // velocity in the y-direction
    this.canvasHeight = canvasHeight; // height of the canvas
  }

  update() {
    // Update the position of the ball based on its velocity
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Check if the ball collides with the top or bottom boundary of the canvas
    if (this.y <= this.radius || this.y + this.radius >= this.canvasHeight) {
      this.velocityY *= -1; // Reverse the y-velocity to bounce the ball
    }
  }

  draw(context) {
    // Draw the ball on the canvas
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

  // Create a new Ball object with the specified properties
  return new Ball(
    canvasWidth / 2, // x-coordinate of the ball (center of the canvas)
    canvasHeight / 2, // y-coordinate of the ball (center of the canvas)
    ballRadius, // radius of the ball
    velocityX, // velocity in the x-direction
    velocityY, // velocity in the y-direction
    canvasHeight // height of the canvas
  );
}

function getRandomNumber(min, max) {
  // Generate a random number between the specified range
  return Math.random() * (max - min) + min;
}
