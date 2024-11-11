const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let birdY = canvas.height / 2;
let gravity = 0.6;
let lift = -10;
let velocity = 0;
let isGameOver = false;

// Event listener for space key
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isGameOver) {
        velocity += lift; // Make the bird jump
    }
});

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird position
    velocity += gravity;
    birdY += velocity;

    // Draw the bird
    ctx.fillStyle = 'yellow';
    ctx.fillRect(50, birdY, 30, 30); // Simple square as the bird

    // Check for game over
    if (birdY > canvas.height || birdY < 0) {
        isGameOver = true;
    }

    // If game is over, display message
    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    } else {
        // Continue the game loop
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop
requestAnimationFrame(gameLoop);
