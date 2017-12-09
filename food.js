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
  this.cords = freeCords[Math.floor(Math.random() * freeCords.length)];
  foodPieces.push(new FoodPiece(this.cords.x, this.cords.y));
}

// blocks.forEach(function(block){
//   if(block.x != this.trueX && block.y != this.trueY){
//     if(foodPieces.length < 1){
//       this.cordOptions.push({x: this.trueX, y: this.trueY});
//     }else{
//       foodPieces.forEach(function(foodPiece){
//         if(foodPiece.x != this.trueX && foodPiece.y != this.trueY){
//           this.cordOptions.push({x: this.trueX, y: this.trueY});
//         }
//       })
//     }
//   }
// })
