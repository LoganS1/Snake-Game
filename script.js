//Fetching HTML elements
var html = document.getElementById("html");
var menuDiv = document.getElementById("menu");
var highScoreSpan = document.getElementById("highScore");
var lastScoreSpan = document.getElementById("lastScore");

//Setting Game Variables
var blocks = [];
var foodPieces = [];
var freeCords = [];
var usedCords = [];
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
  amtOfFood: 1,
  blockSize: 40, //size of the blocks on the grid (Canvas is 1000 px so setting "500" would mean a 2 wide grid)
  speed: 200
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
    changeSpeed();
  }else if(gameState === "ready"){
    readyGame(); //resets and prepares game to start
  }else{
    endGame(); //stops game and opens menu
  }
}

function gameDraw(){
  drawBackground();
  drawFoodPieces();
  drawBlocks();
  drawScore();
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
  blockFoodCollisionDetection();
  blockBlockCollisionDetection();
  blockWallCollisionDetection();
};

function blockFoodCollisionDetection(){
  //Detecting if "snake" has hit food
  this.headBlock = blocks[0];
  foodPieces.forEach(function(foodPiece){
    if(foodPiece.x === this.headBlock.x && foodPiece.y === this.headBlock.y){
      usedToFreeCords(foodPiece.x, foodPiece.y);
      foodPieces.splice(foodPieces.indexOf(foodPiece), 1); //removes foodPiece
      createBlock();
      score++;
    }
  })
}

function blockWallCollisionDetection(){
  this.headBlock = blocks[0];
  //Detecting if the "snake" is past a wall
  if(this.headBlock.x < 0 ||
    this.headBlock.x >= canvas.width ||
    this.headBlock.y < 0 ||
    this.headBlock.y >= canvas.height){
    gameState = "dead";
  }
}

function blockBlockCollisionDetection(){
  //checking to see if the head block has hit any part of itself
  this.headBlock = blocks[0];
  this.amtOfCollisions = 0;
  blocks.forEach(function(block){
    if(block.x === this.headBlock.x && block.y === this.headBlock.y){
      this.amtOfCollisions++;
      if(this.amtOfCollisions > 1){ //the block will have at least one collision because it will colldie with itself
        gameState = "dead";
      }
    }
  })
}

//UTILS
function reset(){
  blocks = [];
  foodPieces = [];
  score = 0;
  freeCords = [];
  usedCords = [];
  calculateFreeCords();
  this.cords = getFreeCords();
  blocks.push(new Block(this.cords.x, this.cords.y, ""));
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

function log(message){
  console.log(message);
}

function changeSpeed(){
  options.speed = 200 * (1 - (score * 0.1) * 0.2);
  if(options.speed < 25){
    options.speed = 25;
  }
  if(gameClock.currInterval != options.speed){
    clearInterval(gameClock.clock);
    gameClock.clock = setInterval(loop, options.speed);
    gameClock.currInterval = options.speed;
  }
}

//Starts the game's clock
var gameClock = {
  clock: setInterval(loop, 200),
  currInterval: 200
}
