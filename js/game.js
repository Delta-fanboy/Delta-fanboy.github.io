// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 50;
const ENEMY_SIZE = 20;
const TOWER_SIZE = 40;
const BULLET_SIZE = 5;

let enemies = [];
let towers = [];
let bullets = [];

let lastEnemySpawnTime = Date.now();
const enemySpawnInterval = 2000;

// Path for the enemies to follow
const path = [
    {x: 0, y: 250},
    {x: 750, y: 250},
    {x: 750, y: 550},
    {x: 0, y: 550}
];

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Spawn enemies
    if (Date.now() - lastEnemySpawnTime > enemySpawnInterval) {
        enemies.push({x: 0, y: 250, pathIndex: 0, health: 100});
        lastEnemySpawnTime = Date.now();
    }

    // Update and draw enemies
    enemies.forEach(enemy => {
        const target = path[enemy.pathIndex];
        const dx = target.x - enemy.x;
        const dy = target.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
            enemy.pathIndex = (enemy.pathIndex + 1) % path.length;
        } else {
            enemy.x += dx / distance;
            enemy.y += dy / distance;
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
    });

    // Update and draw towers
    towers.forEach(tower => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(tower.x, tower.y, TOWER_SIZE, TOWER_SIZE);

        // Shoot bullets
        enemies.forEach(enemy => {
            const dx = enemy.x - tower.x;
            const dy = enemy.y - tower.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                bullets.push({x: tower.x + TOWER_SIZE / 2, y: tower.y + TOWER_SIZE / 2, dx: dx / distance * 5, dy: dy / distance * 5});
            }
        });
    });

    // Update and draw bullets
    bullets = bullets.filter(bullet => bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height);
    bullets.forEach(bullet => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        ctx.fillStyle = 'black';
        ctx.fillRect(bullet.x, bullet.y, BULLET_SIZE, BULLET_SIZE);
    });

    requestAnimationFrame(gameLoop);
}

// Initialize some towers
towers.push({x: 200, y: 200});
towers.push({x: 400, y: 400});

// Start the game loop
gameLoop();
