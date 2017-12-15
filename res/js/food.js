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
  this.cords = getFreeCords();
  freeToUsedCords(this.cords.x, this.cords.y);
  foodPieces.push(new FoodPiece(this.cords.x, this.cords.y));
}
