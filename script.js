let direction = { x: 0, y: 0 };
let foodSound = new Audio("food.mp3");
let overSound = new Audio("gameover.mp3");
let moveSound = new Audio("move.mp3");
let musicSound = new Audio("music.mp3");
let food = { x: 6, y: 8 }
let snakeArr = [
    { x: 13, y: 15 }
]
let score = 0
const Score =  document.querySelector("#score")
Score.innerHTML = `Score : ${score}`

let speed = 8;
let lastPaintTime = 0;

function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        
        return;
    }
    lastPaintTime = cTime;

    gameEngine();

}
function isCollide(snake)
{
    for(let i =1 ; i<snakeArr.length; i++)
    {
        if(snake[i].x==snake[0].x && snake[i].y == snake[0].y)
        {
            return true;
        }
    }
    if(snake[0].x >= 19 || snake[0].x <=0 || snake[0].y >= 19 || snake[0].y <=0)
    {
        return true;
    }
    else{
         return false
    }
  
}
function gameEngine() {
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        //display the snake
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        board.appendChild(snakeElement);
        if (index == 0) {
            snakeElement.classList.add("head")

        }
        else {
            snakeElement.classList.add("snake")

        }
        //Display the food
        foodElement = document.createElement("div")
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        board.appendChild(foodElement)
        foodElement.classList.add("food")

    });
    if(snakeArr[0].x == food.x && snakeArr[0].y==food.y)
        {
            score ++;
            Score.innerHTML = `Score : ${score}`
            foodSound.play()
            snakeArr.unshift({x: snakeArr[0].x + direction.x , y:snakeArr[0].y + direction.y})
            food = {x: Math.round(2 + 14*Math.random()), y: Math.round(2 + 14*Math.random())}
    
        }
        if(isCollide(snakeArr)){
        
            overSound.play()
            musicSound.pause()
            direction = {x:0, y:0}
            alert("The game is over")
            snakeArr = [{ x: 13, y: 15 }]
            musicSound.play()
            score = 0
            Score.innerHTML = `Score : ${score}`
            
        }
    for(let i=snakeArr.length -2 ; i>=0 ;i--)
        {
            snakeArr[i+1] = {...snakeArr[i]};

        }
        snakeArr[0].x += direction.x
        snakeArr[0].y += direction.y
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    direction = { x: 0, y: 0 };
    musicSound.play()
    moveSound.play();

    switch (e.key) {
        case "ArrowUp ":
        case "w":    
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
        case "s":    
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
        case "a":    
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
        case "d":    
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
})
