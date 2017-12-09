//DRAWING
function drawBlocks(){
  c.fillStyle = options.snakeColor;
  blocks.forEach(function(block){
    c.fillRect(block.x, block.y, options.blockSize, options.blockSize);
  })
}

//UPDATING
function updateBlocks(){
  moveBlocks();
  changeBlockDirections();
}

//UTILS
function createBlock(){
  this.lastBlock = blocks[blocks.length - 1]
  //finds where the block should be placed behind the snake
  //depending on the lasts blocks direction
  switch(this.lastBlock.dir){
    case "up":
      this.xCord = this.lastBlock.x;
      this.yCord = this.lastBlock.y + options.blockSize;
      break;
    case "down":
      this.xCord = this.lastBlock.x;
      this.yCord = this.lastBlock.y - options.blockSize;
      break;
    case "right":
      this.xCord = this.lastBlock.x - options.blockSize;
      this.yCord = this.lastBlock.y;
      break;
    case "left":
      this.xCord = this.lastBlock.x + options.blockSize;
      this.yCord = this.lastBlock.y;
      break;
  }
  freeToUsedCords(this.xCord, this.yCord);
  blocks.push(new Block(this.xCord, this.yCord, this.lastBlock.dir));
}

//moves all the blocks according to the directions
function moveBlocks(){
  //special case to check if the snake has turned 180 into itself
  //with only two blocks
  blocks.forEach(function(block){
    if(blocks.indexOf(block) === 0 && blocks[1]){
      if(block.dir === "up" && blocks[1].dir === "down"){
        gameState = "dead";
      }else if(block.dir === "down" && blocks[1].dir === "up"){
        gameState = "dead";
      }else if(block.dir === "right" && blocks[1].dir === "left"){
        gameState = "dead";
      }else if(block.dir === "left" && blocks[1].dir === "right"){
        gameState = "dead";
      }
    }
    usedToFreeCords(block.x, block.y)
    //finds the direction of the current block
    //and moves based on that direction
    switch(block.dir){
      case "up":
        block.y -= options.blockSize;
        break;
      case "down":
        block.y += options.blockSize;
        break;
      case "right":
        block.x += options.blockSize;
        break;
      case "left":
        block.x -= options.blockSize;
        break;
    }
    freeToUsedCords(block.x, block.y);
  })
}

function changeBlockDirections(){
  //sets all the blocks but the headBlock to be the
  //same as the one in front of it
  for(var i = blocks.length - 1; i >= 0; i--){
    if(i != 0){
      blocks[i].dir = blocks[i - 1].dir;
    }
  }
}
