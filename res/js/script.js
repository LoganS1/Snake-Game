//Fetching HTML elements
var html = document.getElementById("html");
var menuDiv = document.getElementById("menu");
var highScoreSpan = document.getElementById("highScore");
var highScoreDifficulty = document.getElementById("highScoreDifficulty");
var lastScoreSpan = document.getElementById("lastScore");
var optionsDiv = document.getElementById("options");
var difficultySelect = document.getElementById("difficulty");
var resetScoresBTN = document.getElementById("resetScoresBTN");

//Setting Game Variables
var blocks = [];
var foodPieces = [];
var freeCords = [];
var usedCords = [];
var gameState = "notStarted";
var mobile;
var scores = {
  currentScore: 0,
  highScores: {
    auto: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    extreme: 0,
    hacker: 0
  }
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  mobile = true;
}else {
  mobile = false;
}

if(screen.width < 500){
  alert("Please turn your phone sideways or use a bigger screen for optimal play!");
}

//Ability to easily change options below
var options = {
  backgroundColor: "black",
  snakeColor: "white",
  foodColor: "red",
  scoreColor: "white",
  amtOfFood: 1,
  blockSize: 40, //size of the blocks on the grid (Canvas is 1000 px so setting "500" would mean a 2 wide grid)
  speed: 200,
  difficulty: "auto"
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
    lastScoreSpan.innerHTML = scores.currentScore; //saves score to lastScore on menu
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
  if(mobile){
    btnContainer.classList.add("disappear");
  }
  canvas.classList.remove("hacker");
  // canvas.classList.add("disappear");
  if(scores.currentScore > scores.highScores[options.difficulty]){
    scores.highScores[options.difficulty] = scores.currentScore;
    highScore.innerHTML = scores.highScores[options.difficulty];
  }
  scores.currentScore = 0;
  saveScores()
}

function readyGame(){
  menuDiv.classList.add("disappear");
  if(mobile){
    btnContainer.classList.remove("disappear");
  }
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
      scores.currentScore++;
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
  scores.currentScore = 0;
  freeCords = [];
  usedCords = [];
  resize();
  calculateFreeCords();
  this.cords = getFreeCords();
  blocks.push(new Block(this.cords.x, this.cords.y, ""));
}

//add listener to detect arrow key usage for movement
document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    //arrow keys
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
    //wasd keys
    case 87:
      blocks[0].dir = "up";
      break;
    case 83:
      blocks[0].dir = "down";
      break;
    case 68:
      blocks[0].dir = "right";
      break;
    case 65:
      blocks[0].dir = "left";
      break;
  }
})

function difficultySelectChange(){
  options.difficulty = difficultySelect.value;
  highScoreDifficulty.innerHTML = options.difficulty.charAt(0).toUpperCase() + options.difficulty.slice(1, options.difficulty.length);
  highScoreSpan.innerHTML = scores.highScores[options.difficulty];
}


function changeSpeed(){
  switch(options.difficulty){
    case "easy":
      options.speed = 200;
      break;
    case "medium":
      options.speed = 125;
      break;
    case "hard":
      options.speed = 75;
      break;
    case "extreme":
      options.speed = 50;
      break;
    case "hacker":
      options.speed = 50;
      canvas.classList.add("hacker");
      break;
    case "auto":
      options.speed = 200 * (1 - (scores.currentScore * 0.1) * 0.2);
      break;
    default:
      options.speed = 125;
      break;
  }

  if(options.speed < 25){
    options.speed = 25;
  }

  if(gameClock.currInterval != options.speed){
    clearInterval(gameClock.clock);
    gameClock.clock = setInterval(loop, options.speed);
    gameClock.currInterval = options.speed;
  }
}

//Score Saving (Using LocalStorage)
//check if scores have been saved before, if not save empty scores
function checkScores(){
  if(!localStorage.getItem("scores")){
    localStorage.setItem("scores", JSON.stringify(scores.highScores));
  }else{
    scores.highScores = JSON.parse(localStorage.getItem("scores"));
  }
}
checkScores();

//set the high score on first load after getting scores
highScoreSpan.innerHTML = scores.highScores[options.difficulty];

function saveScores(){
  if(JSON.stringify(scores.highScores) != localStorage.getItem("scores")){
    //check if any scores are saved, if not save empty scores
    if(!localStorage.getItem("scores")){
      localStorage.setItem("scores", JSON.stringify(scores.highScores));
    }
    this.savedScores = JSON.parse(localStorage.getItem("scores"));
    //TODO - change data structure!
    //yes, I do know the below causes pure terror...
    if(scores.highScores.auto > this.savedScores.auto){
      this.savedScores.auto = scores.highScores.auto
    }else if(scores.highScores.easy > this.savedScores.easy){
      this.savedScores.easy = scores.highScores.easy
    }else if(scores.highScores.medium > this.savedScores.medium){
      this.savedScores.medium = scores.highScores.medium
    }else if(scores.highScores.hard > this.savedScores.hard){
      this.savedScores.hard = scores.highScores.hard
    }else if(scores.highScores.extreme > this.savedScores.extreme){
      this.savedScores.extreme = scores.highScores.extreme
    }else if(scores.highScores.hacker > this.savedScores.hacker){
      this.savedScores.hacker = scores.highScores.hacker
    }
    //save the score to storage
    localStorage.setItem("scores", JSON.stringify(this.savedScores));
    console.log("saved scores");
  }
}

//reset scores
resetScoresBTN.addEventListener("click", function(){
  scores.highScores = {
    auto: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    extreme: 0,
    hacker: 0
  }
  localStorage.removeItem("scores");
  highScore.innerHTML = scores.highScores[options.difficulty];
})

//Starts the game's clock
var gameClock = {
  clock: setInterval(loop, 200),
  currInterval: 200
}
