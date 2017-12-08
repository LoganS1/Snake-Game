var blocks = [];
var foodPieces = [];
var score = 0;
var addBlock = {
  yes: false,
  block: ""
}
var gameState = "notStarted";
console.log(gameState);
var options = {
  backgroundColor: "black",
  snakeColor: "white",
  foodColor: "red",
  scoreColor: "white",
  gridSize: 40
}
var html = document.getElementById("html");
var menuDiv = document.getElementById("menu");
var highScoreSpan = document.getElementById("highScore");
var lastScoreSpan = document.getElementById("lastScore");

//CLASSES
function Block(x, y, dir){
  this.x = x;
  this.y = y;
  this.dir = dir;
}

function FoodPiece(x, y){
  this.x = x;
  this.y = y;
}

//MAIN FUNCTIONS
function loop(){
  if(gameState === "started"){
    c.clearRect(0, 0, canvas.width, canvas.height);
    console.log("game running");
    gameUpdate();
    gameDraw();
    collisionDetection();
  }else if(gameState === "ready"){
    console.log("readying Game");
    readyGame();
  }else{
    console.log("Game Over");
    endGame();
  }
}

function gameDraw(){
  drawBackground();
  drawScore();
  drawBlocks();
  drawFoodPieces();
}

function gameUpdate(){
  updateBlocks();
  updateFoodPieces();
}

function collisionDetection(){
  foodPieces.forEach(function(foodPiece){
    blocks.forEach(function(block){
      if(foodPiece.x === block.x && foodPiece.y === block.y){
        createBlock();
        score++;
        foodPieces.splice(foodPieces.indexOf(foodPiece), 1);
      }
    })
  })
  blocks.forEach(function(block){
    this.amtOfCollisions = 0;
    blocks.forEach(function(block2){
      if(block.x === block2.x && block.y === block2.y){
        this.amtOfCollisions++;
        if(this.amtOfCollisions > 1){
          gameState = "dead";
        }
      }
    })
  })
};

function createRandXY(){
  this.xLimit = canvas.width / options.gridSize;
  this.yLimit = canvas.height /options.gridSize;
  this.x = Math.floor(Math.random() * this.xLimit) * options.gridSize;
  this.y = Math.floor(Math.random() * this.yLimit) * options.gridSize;
  return {x: this.x, y: this.y};
}

function endGame(){
  menu.classList.remove("disappear");
  // canvas.classList.add("disappear");
  lastScore.innerHTML = score;
  if(score > highScore.innerHTML){
    highScore.innerHTML = score;
  }
}

function readyGame(){
  menuDiv.classList.add("disappear");
  // canvas.classList.remove("disappear");
  reset();
  gameState = "started";
}

function reset(){
  blocks = [];
  foods = [];
  score = 0;
  this.randCords = createRandXY();
  blocks.push(new Block(this.randCords.x, this.randCords.y, ""));
}

document.addEventListener("keypress", function(e){
  switch(e.keyCode){
    case 38:
      blocks[0].dir = "up";
      break;
    case 40:
      blocks[0].dir = "down";
      break;
    case 39:
      blocks[0].dir = "right";
      break;
    case 37:
      blocks[0].dir = "left";
      break;
  }
})

reset();
var gameClock = setInterval(loop, 100);
