// Paddle.js
class Paddle {
  constructor(x, y, width, height, canvasHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityY = 0;
    this.paddleSpeed = 8; // Added paddleSpeed variable
    this.canvasHeight = canvasHeight;
  }

  draw(context) {
    context.fillStyle = '#fff';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(context) {
    const newY = this.y + this.velocityY;
    if (!this.outOfBounds(newY)) {
      this.y = newY;
    }
    this.draw(context);
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
    return yPosition < 0 || yPosition + this.height > this.canvasHeight;
  }
}

export default Paddle;
