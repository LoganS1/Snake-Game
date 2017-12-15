function calculateFreeCords(){
  this.difference = canvas.width / canvas.height;
  this.xLimit = canvas.width / options.blockSize; //finds the amt of x spaces using the grid size
  this.yLimit = canvas.height / options.blockSize; //finds the amt of y spaces using the grid size
  for(var x = 0; x < this.xLimit; x++){
    for(var y = 0; y < this.yLimit; y++){
      this.trueX = x * options.blockSize;
      this.trueY = y * options.blockSize;
      freeCords.push({x: this.trueX, y: this.trueY});
    }
  }
}

function freeToUsedCords(x, y){
  this.cords = {x: x, y: y};
  freeCords.forEach(function(obj){
    if(obj.x === this.cords.x && obj.y === this.cords.y){
      freeCords.splice(freeCords.indexOf(obj), 1);
    }
  })
  usedCords.push(this.cords);
}

function usedToFreeCords(x, y){
  this.cords = {x: x, y: y};
  usedCords.forEach(function(obj){
    if(obj.x === this.cords.x && obj.y === this.cords.y){
      usedCords.splice(usedCords.indexOf(obj), 1);
    }
  })
  freeCords.push(this.cords);
}

function getFreeCords(){
  return freeCords[Math.floor(Math.random() * freeCords.length)];
}
