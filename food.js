function drawFoodPieces() {
  foodPieces.forEach(function(foodPiece){
    c.fillStyle = options.foodColor;
    c.fillRect(foodPiece.x, foodPiece.y, options.gridSize, options.gridSize);
  })
}

function updateFoodPieces(){
  if(foodPieces.length < 1){
    createFoodPiece();
  }
}

function createFoodPiece(){
  this.randCords = createRandXY();
  foodPieces.push(new FoodPiece(this.randCords.x, this.randCords.y))
}
