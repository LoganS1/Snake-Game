//DRAWING
function drawFoodPieces() {
  foodPieces.forEach(function(foodPiece){
    c.fillStyle = options.foodColor;
    c.fillRect(foodPiece.x, foodPiece.y, options.blockSize, options.blockSize);
  })
}

//UPDATING
function updateFoodPieces(){
  if(foodPieces.length < options.amtOfFood){
    createFoodPiece();
  }
}

//UTILS
function createFoodPiece(){
  this.randCords = createRandXY();
  foodPieces.push(new FoodPiece(this.randCords.x, this.randCords.y))
}
