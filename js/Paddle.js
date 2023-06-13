// Class representing a game paddle
class Paddle {
  constructor(x, y, width, height, canvasHeight) {
    this.x = x; // X-coordinate of the paddle
    this.y = y; // Y-coordinate of the paddle
    this.width = width; // Width of the paddle
    this.height = height; // Height of the paddle
    this.velocityY = 0; // Vertical velocity of the paddle
    this.paddleSpeed = 8; // Speed at which the paddle moves (added paddleSpeed variable)
    this.canvasHeight = canvasHeight; // Height of the canvas
  }

  // Draw the paddle on the canvas
  draw(context) {
    context.fillStyle = "#fff"; // Set the fill color to white
    context.fillRect(this.x, this.y, this.width, this.height); // Draw a rectangle representing the paddle
  }

  // Update the paddle's position and redraw it on the canvas
  update(context) {
    const newY = this.y + this.velocityY; // Calculate the new Y-coordinate of the paddle
    if (!this.outOfBounds(newY)) { // Check if the new position is within the canvas bounds
      this.y = newY; // Update the Y-coordinate of the paddle
    }
    this.draw(context); // Redraw the paddle on the canvas
  }

  // Move the paddle upward
  moveUp() {
    this.velocityY = -this.paddleSpeed; // Set the vertical velocity to a negative value
  }

  // Move the paddle downward
  moveDown() {
    this.velocityY = this.paddleSpeed; // Set the vertical velocity to a positive value
  }

  // Stop the paddle from moving
  stop() {
    this.velocityY = 0; // Set the vertical velocity to zero
  }

  // Check if the paddle is out of bounds given a Y-position
  outOfBounds(yPosition) {
    return yPosition < 0 || yPosition + this.height > this.canvasHeight; // Returns true if the paddle is above or below the canvas, otherwise false
  }
}

export default Paddle; // Export the Paddle class as the default export
