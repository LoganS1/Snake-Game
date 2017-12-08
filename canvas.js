var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
canvas.height = 1000;
canvas.width = 1000;

function drawBackground(){
  c.fillStyle = options.backgroundColor;
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore(){
  c.font = "32px Impact";
  c.fillStyle = options.scoreColor;
  c.textAlign = "left";
  c.fillText("Score: " + score, canvas.width - 150, 50);
}
