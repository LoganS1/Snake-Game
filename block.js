function drawBlocks(){
  c.fillStyle = options.snakeColor;
  blocks.forEach(function(block){
    c.fillRect(block.x, block.y, options.gridSize, options.gridSize);
  })
}

function updateBlocks(){
  if(addBlock.yes){
    blocks.push(addBlock.block);
    addBlock.yes = false;
    addBlock.block = "";
  }
  for(var i = blocks.length - 1; i >= 0; i--){
    if(i != 0){
      blocks[i].x = blocks[i - 1].x;
      blocks[i].y = blocks[i - 1].y;
    }
  }
  this.frontBlock = blocks[0];
    if(this.frontBlock.dir === "up" && this.frontBlock.y > 0){
      this.frontBlock.y -= options.gridSize;
    }else if(this.frontBlock.dir === "down" && this.frontBlock.y + options.gridSize < canvas.height){
      this.frontBlock.y += options.gridSize;
    }else if(this.frontBlock.dir === "right" && this.frontBlock.x + options.gridSize < canvas.width){
      this.frontBlock.x += options.gridSize;
    }else if(this.frontBlock.dir === "left" && this.frontBlock.x > 0){
      this.frontBlock.x -= options.gridSize;
    }
}

function createBlock(){
  this.x = blocks[blocks.length - 1].x;
  this.y = blocks[blocks.length - 1].y;
  addBlock.block = new Block(this.x, this.y, blocks[blocks.length - 1].dir);
  addBlock.yes = true;
}
