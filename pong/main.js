const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const WIDTH = 750;
const HEIGHT = 450;

canvas.height = HEIGHT;
canvas.width = WIDTH;

context.fillStyle = '#fff';
let paddle_left = context.fillRect(10, HEIGHT/2 - 35, 10, 70);
let paddle_right = context.fillRect(WIDTH - 20, HEIGHT/2 - 35, 10, 70);

context.beginPath()
let ball = context.arc(WIDTH/2, HEIGHT/2, 8, 0, Math.PI*2)
context.fill()