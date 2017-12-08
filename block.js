//DRAWING
function drawBlocks(){
  c.fillStyle = options.snakeColor;
  blocks.forEach(function(block){
    c.fillRect(block.x, block.y, options.blockSize, options.blockSize);
  })
}

//UPDATING
function updateBlocks(){
  if(addBlock.yes){
    blocks.push(addBlock.block);
    addBlock.yes = false;
    addBlock.block = "";
  }

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
}

//UTILS
function createBlock(){
  this.x = blocks[blocks.length - 1].x;
  this.y = blocks[blocks.length - 1].y;
  addBlock.block = new Block(this.x, this.y, blocks[blocks.length - 1].dir);
  addBlock.yes = true;
}

function moveTailBlocks(){
  for(var i = blocks.length - 1; i >= 0; i--){
    if(i != 0){
      blocks[i].x = blocks[i - 1].x;
      blocks[i].y = blocks[i - 1].y;
    }
  }
}
