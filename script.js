const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d');
const gameOverText = document.getElementById('gameOver')


let foodX
let foodY
let gameInterval

let Score = 0;

let changingDirection = false;

let dx=10
let dy=0
let snake = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 },
    ];

createFood()
document.getElementById('button').addEventListener('click', main)

function createNumber(min, max) {
   return Math.round(Math.random() * (max - min)/10 ) * 10
}

function createFood(params) {
    foodX = createNumber(10,290)
    foodY = createNumber(10,290)
    snake.forEach(snakePart => {
        if (
            foodX === snakePart.x && foodY === snakePart.y
        ) {
            createFood()
        }

    })
}

document.addEventListener('keydown', changeDirectionPC);
function changeDirectionPC(event) {
    const LEFT_KEY = 'ArrowLeft';
    const RIGHT_KEY = 'ArrowRight';
    const UP_KEY = 'ArrowUp';
    const DOWN_KEY = 'ArrowDown';

    if(changingDirection) return;
    changingDirection = true;

    const keyPressed = event.key;
    if (keyPressed === LEFT_KEY && dx !== 10) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === RIGHT_KEY && dx !== -10) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && dy !== 10) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === DOWN_KEY && dy !== -10) {
        dx = 0;
        dy = 10;
    }
}

document.getElementById('UP').addEventListener('click', () => changeDirection('UP'));
document.getElementById('LEFT').addEventListener('click', () => changeDirection('LEFT'));
document.getElementById('RIGHT').addEventListener('click', () => changeDirection('RIGHT'));
document.getElementById('DOWN').addEventListener('click', () => changeDirection('DOWN'));

function changeDirection(direction) {
    if (changingDirection) return;
    changingDirection = true;

    if (direction === 'LEFT' && dx !== 10) {
        dx = -10;
        dy = 0;
    }

    if (direction === 'RIGHT' && dx !== -10) {
        dx = 10;
        dy = 0;
    }

    if (direction === 'UP' && dy !== 10) {
        dx = 0;
        dy = -10;
    }

    if (direction === 'DOWN' && dy !== -10) {
        dx = 0;
        dy = 10;
    }
}


function drawCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
function drawFood() {
    console.log('food')
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}
function drawSnake() {
    snake.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    });
}

function advanceSnake() {
    const head = { x : snake[0].x + dx , y : snake[0].y + dy}
    snake.unshift(head)
    if (snake[0].x==foodX && snake[0].y==foodY) {
        console.log('food eated')
        createFood()
        Score+=10
        score.textContent = Score
    } else {
        snake.pop()
    }

}
function teleport(params) {
    snake.forEach(snakePart => {
        if (snakePart.x<0){
            snakePart.x += 300
        }   if (snakePart.y<0) {
           snakePart.y += 300
        }   if (snakePart.x>canvas.width) {
                snakePart.x -= 310
        }   if (snakePart.y>canvas.height){
                snakePart.y -=310
        }
    })


}

let gameOver = false
function gameOvering() {
    snake.forEach((snakePart, index) => {
        if (index!==0 && snake[0].x === snakePart.x && snake[0].y === snakePart.y) {
            gameOver = true
            gameOverText.style.display = ('block')
            document.getElementById('button').style.display = 'inline-block'
        }
})
}
function killSnake() {
    snake.splice(0, snake.length);
    console.log(snake)
}

function main(params) {
    gameOver = false;
    Score = 0;
    score.textContent = Score;
    dx = 10
    dy = 0
    snake = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 },
    ];
    createFood();
    gameOverText.style.display = 'none'
    document.getElementById('button').style.display = 'none'
    gameInterval = setInterval(() => {

        if (gameOver) {
            killSnake()
            clearInterval(gameInterval);
            return;
        }
        changingDirection = false;
        drawCanvas()
        drawFood()
        drawSnake()
        teleport()
        advanceSnake()
        gameOvering()

    }, 100);
}
