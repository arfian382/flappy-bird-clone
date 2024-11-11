const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.5, lift: -10, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;

function setup() {
    pipes.push(new Pipe());
    document.addEventListener('keydown', () => {
        bird.velocity += bird.lift;
    });
    requestAnimationFrame(gameLoop);
}

function Pipe() {
    this.top = Math.random() * (canvas.height / 2);
    this.bottom = canvas.height - (this.top + 100);
    this.x = canvas.width;
    this.width = 20;
    this.speed = 2;

    this.show = function() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    };

    this.update = function() {
        this.x -= this.speed;
    };

    this.offscreen = function() {
        return this.x < -this.width;
    };
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y > canvas.height) {
        bird.y = canvas.height;
        bird.velocity = 0;
    }
    if (bird.y < 0) {
        bird.y = 0;
    }

    if (frame % 75 === 0) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();
        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
            score++;
        }
    }

    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);

    frame++;
    requestAnimationFrame(gameLoop);
}

setup();