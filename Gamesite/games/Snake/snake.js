
//board
var blocSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blocSize * 5;
var snakeY = blocSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocSize;
    board.width = cols * blocSize;
    context = board.getContext("2d") //used for drawing on board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10);
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocSize, blocSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i -1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blocSize;
    snakeY += velocityY * blocSize;
    context.fillRect(snakeX, snakeY, blocSize, blocSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocSize, blocSize);
    }
    
    //game over conditions
    if (snakeX < 0 || snakeX > cols*blocSize || snakeY < 0 || snakeY > rows*blocSize) {
        gameOver = true;
        alert("Game Over! You Suck \nPlease Reload Page");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over! You Suck \n Please Reload Page");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}



function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocSize;
    foodY = Math.floor(Math.random() * cols) * blocSize;
}