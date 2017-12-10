//Sets up canvas
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
window.onresize = resize;
resize();

//DRAWING
function drawBackground(){
  c.fillStyle = options.backgroundColor;
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore(){
  c.font = "32px Impact";
  c.fillStyle = options.scoreColor;
  c.textAlign = "left";
  c.fillText("Score: " + scores.currentScore, canvas.width - 150, 50);
  c.strokeText("Score: " + scores.currentScore, canvas.width - 150, 50);
}

//UTILS
function clearCanvas(){
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function resize(){
  //sizing canvas to 95% of view port
  canvas.height = window.innerHeight * 0.95;
  canvas.width = window.innerWidth * 0.95;
  //fixes sizing issue with grid by adjusting
  //to overlap of the grid
  this.x = 0;
  this.y = 0;
  while(this.x < canvas.width){
    this.x += options.blockSize;
  }
  while(this.y < canvas.height){
    this.y += options.blockSize;
  }
  canvas.width -= canvas.width - this.x;
  canvas.height -= canvas.height - this.y;
}
