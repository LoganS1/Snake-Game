//DRAWING
function drawBlocks(){
  c.fillStyle = options.snakeColor;
  blocks.forEach(function(block){
    c.fillRect(block.x, block.y, options.blockSize, options.blockSize);
  })
}

//UPDATING
function updateBlocks(){
  //Looks to see if a block is queudd to be added
  //if so, add that block
  if(addBlock.yes){
    blocks.push(addBlock.block);
    freeToUsedCords(addBlock.block.x, addBlock.block.y);
    addBlock.yes = false;
    addBlock.block = "";
  }
  moveTailBlocks();
  moveHeadBlock();
}

//UTILS
function createBlock(){
  /*sets the new block to be in the same place as the current tail block
    then puts it in the queue to be added next cycle (to prevent the block from being inside another
    block and acitvating the collision detection) */
  this.x = blocks[blocks.length - 1].x;
  this.y = blocks[blocks.length - 1].y;
  addBlock.block = new Block(this.x, this.y, blocks[blocks.length - 1].dir);
  addBlock.yes = true;
}

function moveHeadBlock(){
  this.frontBlock = blocks[0];
    if(this.frontBlock.dir === "up" && this.frontBlock.y > 0){
      this.frontBlock.y -= options.blockSize;
    }else if(this.frontBlock.dir === "down" && this.frontBlock.y + options.blockSize < canvas.height){
      this.frontBlock.y += options.blockSize;
    }else if(this.frontBlock.dir === "right" && this.frontBlock.x + options.blockSize < canvas.width){
      this.frontBlock.x += options.blockSize;
    }else if(this.frontBlock.dir === "left" && this.frontBlock.x > 0){
      this.frontBlock.x -= options.blockSize;
    }

    freeToUsedCords(this.frontBlock.x, this.frontBlock.y);
}

function moveTailBlocks(){
  /*runs through array backwards moving blocks (all but the first) to be in the same spot as the block in
    in front of the current in the array*/
  //essentially moving the tail forward starting from the end working ot the front
  for(var i = blocks.length - 1; i >= 0; i--){
    if(i != 0){
      usedToFreeCords(blocks[i].x, blocks[i].y);
      blocks[i].x = blocks[i - 1].x;
      blocks[i].y = blocks[i - 1].y;
      freeToUsedCords(blocks[i].x, blocks[i].y);
    }else{
      usedToFreeCords(blocks[i].x, blocks[i].y);
    }
  }
}
