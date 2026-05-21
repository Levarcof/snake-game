let direction = { x: 0, y: 0 };
let currentInputDirection = { x: 0, y: 0 }; // Illegal double turns ko lock karne ke liye

// Safe Audio management fallback systems
let foodSound = new Audio("food.mp3");
let overSound = new Audio("gameover.mp3");
let moveSound = new Audio("move.mp3");
let musicSound = new Audio("music.mp3");
musicSound.loop = true;

// Grid constraints standard 18x18 limits ke sath synced hai
let food = { x: 6, y: 8 };
let snakeArr = [{ x: 9, y: 12 }];
let score = 0;
let baseSpeed = 7; 
let speedMultiplier = 1;
let lastPaintTime = 0;
let isGameActive = false;

const scoreElement = document.querySelector("#score");
const speedElement = document.querySelector("#speed-display");
const boardElement = document.getElementById("board");
const startScreen = document.getElementById("start-screen");

// Mode management configurations
function setDifficulty(mode) {
    document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (mode === 'easy') baseSpeed = 5;
    else if (mode === 'medium') baseSpeed = 8;
    else if (mode === 'hard') baseSpeed = 13;
}

function startGame() {
    startScreen.classList.add('hidden');
    // State reset arrays
    snakeArr = [{ x: 9, y: 12 }];
    direction = { x: 0, y: 0 };
    currentInputDirection = { x: 0, y: 0 };
    score = 0;
    speedMultiplier = 1;
    scoreElement.innerHTML = `Score : ${score}`;
    speedElement.innerHTML = `Speed: ${speedMultiplier.toFixed(1)}x`;
    
    // Food safe spawn execution
    generateFood();
    
    isGameActive = true;
    musicSound.play().catch(() => console.log("Audio waiting for explicit interaction rules"));
    window.requestAnimationFrame(main);
}

function main(cTime) {
    if (!isGameActive) return;

    window.requestAnimationFrame(main);
    // Dynamic adaptive target scale limits calculates standard frame-skips
    let calculatedSpeed = baseSpeed * speedMultiplier;
    if ((cTime - lastPaintTime) / 1000 < 1 / calculatedSpeed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide(snake) {
    // Case 1: Khud se crash hona
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // Case 2: Out of bound grid canvas restrictions (18x18 index layout patterns)
    if (snake[0].x > 18 || snake[0].x <= 0 || snake[0].y > 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function generateFood() {
    let newFoodPos;
    let onSnake = true;
    
    while (onSnake) {
        newFoodPos = {
            x: Math.floor(Math.random() * 18) + 1,
            y: Math.floor(Math.random() * 18) + 1
        };
        // Ensure standard food does not overlay inside current structural segments
        onSnake = snakeArr.some(segment => segment.x === newFoodPos.x && segment.y === newFoodPos.y);
    }
    food = newFoodPos;
}

function gameEngine() {
    // Current layout loops
    boardElement.innerHTML = "";
    currentInputDirection = { ...direction };

    // Render operations for segments
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        boardElement.appendChild(snakeElement);
    });

    // Render operations for specific target food vector bounds
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    boardElement.appendChild(foodElement);

    // Eating core condition systems
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score++;
        scoreElement.innerHTML = `Score : ${score}`;
        
        // Custom speed curve: Har point par speed thodi si barh jayegi (incremental growth)
        speedMultiplier += 0.05; 
        speedElement.innerHTML = `Speed: ${speedMultiplier.toFixed(1)}x`;
        
        try { foodSound.play(); } catch(e){}
        
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        generateFood();
    }

    // Move implementation sequences
    if (direction.x !== 0 || direction.y !== 0) {
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += direction.x;
        snakeArr[0].y += direction.y;
    }

    // Collapse evaluations
    if (isCollide(snakeArr)) {
        isGameActive = false;
        try { overSound.play(); musicSound.pause(); } catch(e){}
        
        document.getElementById("menu-title").innerText = "Game Over 💀";
        document.getElementById("start-screen").classList.remove('hidden');
    }
}

// Controller logic configurations (Input checking targets strict inversion control layouts)
function handleDirection(action) {
    if (!isGameActive) return;
    
    try { moveSound.play(); } catch(e){}

    switch (action) {
        case "UP":
            if (currentInputDirection.y !== 0) break; // Agar already vertical chal raha h to skip
            direction = { x: 0, y: -1 };
            break;
        case "DOWN":
            if (currentInputDirection.y !== 0) break;
            direction = { x: 0, y: 1 };
            break;
        case "LEFT":
            if (currentInputDirection.x !== 0) break; // Agar horizontally continuous hai to lock
            direction = { x: -1, y: 0 };
            break;
        case "RIGHT":
            if (currentInputDirection.x !== 0) break;
            direction = { x: 1, y: 0 };
            break;
    }
}

// Global Keyboard hooks mapping
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            handleDirection("UP");
            break;
        case "ArrowDown":
        case "s":
        case "S":
            handleDirection("DOWN");
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            handleDirection("LEFT");
            break;
        case "ArrowRight":
        case "d":
        case "D":
            handleDirection("RIGHT");
            break;
    }
});
