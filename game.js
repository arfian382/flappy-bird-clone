const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const refreshButton = document.getElementById('refreshButton');

let dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.5,
    jumpPower: 10,
    velocityY: 0,
    isJumping: false
};

let obstacles = [];
let score = 0;
let gameOver = false;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    if (Math.random() < 0.01) {
        obstacles.push({
            x: canvas.width,
            y: 150,
            width: 20,
            height: 20
        });
    }

    obstacles.forEach(obstacle => {
        obstacle.x -= 5;

        if (obstacle.x < 0) {
            obstacles.shift();
            score++;
        }

        // Collision detection
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            gameOver = true;
        }
    });
}

function jump() {
    if (!dino.isJumping) {
        dino.velocityY = -dino.jumpPower;
        dino.isJumping = true;
    }
}

function update() {
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.fillText("Game Over! Score: " + score, canvas.width / 4, canvas.height / 2);
        refreshButton.style.display = 'block'; // Tampilkan tombol refresh
        return;
    }

    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;

    if (dino.y >= 150) {
        dino.y = 150;
        dino.isJumping = false;
    }

    updateObstacles();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();

    ctx.fillStyle = 'black';
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Event listener untuk sentuhan
document.addEventListener('touchstart', function(event) {
    jump();
});

// Event listener untuk tombol refresh
refreshButton.addEventListener('click', function() {
    resetGame();
});

// Fungsi untuk mereset permainan
function resetGame() {
    dino.y = 150;
    dino.velocityY = 0;
    dino.isJumping = false;
    obstacles = [];
    score = 0;
    gameOver = false;
    refreshButton.style.display = 'none'; // Sembunyikan tombol refresh
    gameLoop();
}

gameLoop
