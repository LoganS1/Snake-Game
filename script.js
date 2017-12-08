//Fetching HTML elements
var html = document.getElementById("html");
var menuDiv = document.getElementById("menu");
var highScoreSpan = document.getElementById("highScore");
var lastScoreSpan = document.getElementById("lastScore");

//Setting Game Variables
var blocks = [];
var foodPieces = [];
var gameState = "notStarted";
var score = 0;
var addBlock = {
  yes: false,
  block: ""
}

//Ability to easily change options below
var options = {
  backgroundColor: "black",
  snakeColor: "white",
  foodColor: "red",
  scoreColor: "white",
  amtOfFood: 2,
  blockSize: 40 //size of the blocks on the grid (Canvas is 1000 px so setting "500" would mean a 2 wide grid)
}

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
    clearCanvas();
    gameUpdate(); //updates placing of all blocks
    gameDraw();
    collisionDetection(); //texts if "snake" is hitting itself or food and applies consequence
  }else if(gameState === "ready"){
    readyGame(); //resets and prepares game to start
  }else{
    endGame(); //stops game and opens menu
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

//GAME STATES
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

//SUB FUNCTIONS
function collisionDetection(){
  //Detecting if "snake" has hit food
  foodPieces.forEach(function(foodPiece){
    this.headBlock = blocks[0];
    if(foodPiece.x === this.headBlock.x && foodPiece.y === this.headBlock.y){
      foodPieces.splice(foodPieces.indexOf(foodPiece), 1); //removes foodPiece
      createBlock();
      score++;
    }
  })
  //Detecting if the "snake" has hit itself
  blocks.forEach(function(block){
    this.amtOfCollisions = 0;
    blocks.forEach(function(block2){
      if(block.x === block2.x && block.y === block2.y){
        this.amtOfCollisions++;
        if(this.amtOfCollisions > 1){ //the block will have at least one collision because it will colldie with itself
          gameState = "dead";
        }
      }
    })
  })
};

//UTILS
function createRandXY(){
  this.xLimit = canvas.width / options.blockSize; //finds the amt of x spaces using the grid size
  this.yLimit = canvas.height /options.blockSize; //finds the amt of y spaces using the grid size
  this.x = Math.floor(Math.random() * this.xLimit) * options.blockSize; //picks a random spot on the amt of elgible spaces
  this.y = Math.floor(Math.random() * this.yLimit) * options.blockSize; //then adds back the grid size to get the true size
  return {x: this.x, y: this.y};
}

function reset(){
  blocks = [];
  foods = [];
  score = 0;
  this.randCords = createRandXY();
  blocks.push(new Block(this.randCords.x, this.randCords.y, ""));
}

//add listener to detect arrow key usage for movement
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

//Starts the game's clock
var gameClock = setInterval(loop, 100);
