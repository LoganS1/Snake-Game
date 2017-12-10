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
  c.fillText("Score: " + score, canvas.width - 150, 50);
  c.strokeText("Score: " + score, canvas.width - 150, 50);
}

//UTILS
function clearCanvas(){
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function resize(){
  canvas.height = window.innerHeight * 0.95;
  canvas.width = window.innerWidth * 0.95;

  this.x = 0;
  this.y = 0;
  while(this.x < canvas.width){
    this.x += options.blockSize;
  }
  while(this.y < canvas.height){
    this.y += options.blockSize;
  }
  log(canvas.width - this.x);
  canvas.width -= canvas.width - this.x;
  canvas.height -= canvas.height - this.y;
  log(canvas.width - this.x);
}
