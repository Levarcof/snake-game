// Game Constants & Configuration
const GRID_SIZE = 18;
let gameInterval = null;
let score = 0;
let currentDifficulty = 'medium';

// Snake Setup (Grid is 1 to 18)
let snake = [
    { x: 9, y: 9 },
    { x: 9, y: 10 },
    { x: 9, y: 11 }
];

let food = { x: 5, y: 5 };
let direction = { x: 0, y: -1 }; // Initial direction: UP
let lastExecutedDirection = { x: 0, y: -1 }; // Prevents instant reverse self-collision bug

// Difficulty Speed Map (In Milliseconds)
const speeds = {
    easy: 180,
    medium: 130,
    hard: 80
};

// Speed Display factor
const speedMultipliers = {
    easy: '0.8x',
    medium: '1.0x',
    hard: '1.5x'
};

// Set Game Difficulty & UI State Update
function setDifficulty(level) {
    currentDifficulty = level;
    document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${level}`).classList.add('active');
}

// Start / Restart Game Session
function startGame() {
    // Reset state
    score = 0;
    snake = [
        { x: 9, y: 9 },
        { x: 9, y: 10 },
        { x: 9, y: 11 }
    ];
    direction = { x: 0, y: -1 };
    lastExecutedDirection = { x: 0, y: -1 };
    
    document.getElementById('score').innerText = `Score : ${score}`;
    document.getElementById('speed-display').innerText = `Speed: ${speedMultipliers[currentDifficulty]}`;
    document.getElementById('start-screen').classList.add('hidden');
    
    generateFood();
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameEngine, speeds[currentDifficulty]);
}

// Core Game Loop
function gameEngine() {
    // 1. Collision Check (Wall & Tail)
    if (isCollision()) {
        gameOver();
        return;
    }

    // Lock the current moving direction
    lastExecutedDirection = { ...direction };

    // 2. Food Consumption Check
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        document.getElementById('score').innerText = `Score : ${score}`;
        generateFood();
    } else {
        // Remove tail segment if food is not eaten
        snake.pop();
    }

    // 3. Snake Translation Mechanics
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };
    snake.unshift(newHead);

    // 4. Draw updated frame on grid board
    renderFrame();
}

// Direction Input Handling (Keyboard & D-pad Touch combined safe lock)
function handleDirection(move) {
    switch (move) {
        case 'UP':
            if (lastExecutedDirection.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 'DOWN':
            if (lastExecutedDirection.y !== -1) direction = { x: 0, y: 1 };
            break;
        case 'LEFT':
            if (lastExecutedDirection.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 'RIGHT':
            if (lastExecutedDirection.x !== -1) direction = { x: 1, y: 0 };
            break;
    }
}

// Physics & Grid Bound Validation
function isCollision() {
    const head = snake[0];
    
    // Exact Bound evaluation (Grid index starts from 1 to 18 inclusive)
    if (head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE) {
        return true;
    }
    
    // Tail segment impact collision check
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Random Fruit Spawn System within valid parameters
function generateFood() {
    let validSpawn = false;
    while (!validSpawn) {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE) + 1,
            y: Math.floor(Math.random() * GRID_SIZE) + 1
        };
        
        // Ensure food never spawns inside the snake body
        validSpawn = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

// High Performance Frame Rendering System
function renderFrame() {
    const board = document.getElementById('board');
    board.innerHTML = ''; // Fresh render buffer clearing

    // Render Snake Structure
    snake.forEach((segment, index) => {
        const element = document.createElement('div');
        element.style.gridRowStart = segment.y;
        element.style.gridColumnStart = segment.x;
        element.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(element);
    });

    // Render Food Structure
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Game Over Intermission state
function gameOver() {
    clearInterval(gameInterval);
    document.getElementById('menu-title').innerText = "Game Over 💀";
    document.getElementById('start-screen').querySelector('p').innerText = `Final Score: ${score}`;
    document.getElementById('start-screen').classList.remove('hidden');
}

// Desktop Keyboard Input Router
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            handleDirection('UP');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            handleDirection('DOWN');
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            handleDirection('LEFT');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            handleDirection('RIGHT');
            break;
    }
});
