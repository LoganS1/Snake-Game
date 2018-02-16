let upArrow = document.getElementById("upArrow");
let leftArrow = document.getElementById("leftArrow");
let rightArrow = document.getElementById("rightArrow");
let downArrow = document.getElementById("downArrow");
let btnContainer = document.getElementById("btnContainer");

let arrowBtns = [upArrow, leftArrow, rightArrow, downArrow];

for(let i = 0; i < arrowBtns.length; i++){
    arrowBtns[i].addEventListener("click", (e)=>{
        switch(e.target.id){
            case "upArrow": blocks[0].dir = "up";
            console.log("up");
                break;
            case "leftArrow": blocks[0].dir = "left";
                break;
            case "rightArrow": blocks[0].dir = "right";
                break;
            case "downArrow": blocks[0].dir = "down";
                break;
        }
        e.preventDefault();
    });
    arrowBtns[i].addEventListener("touchstart", (e)=>{
        switch(e.target.id){
            case "upArrow": blocks[0].dir = "up";
                break;
            case "leftArrow": blocks[0].dir = "left";
                break;
            case "rightArrow": blocks[0].dir = "right";
                break;
            case "downArrow": blocks[0].dir = "down";
                break;
        }
        e.preventDefault();
    });
}