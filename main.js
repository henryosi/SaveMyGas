// cached elements refernces
var canvas = document.getElementById("CanvasSmg");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 800;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// Get the width and height from the canvas element
var width = canvas.width;
var height = canvas.height; //Try to make canvas responsive by using window.innerHeight
// if (width  < window.innerWidth)
//             {
//                 width  = window.innerWidth;
//             }

// if (height < window.innerHeight)
//             {
//                 height = window.innerHeight;
//             }
        
// work out the width and height in blocks
var blockSize = 10 // come back and use this.j/i
var widthInBlocks = width/blockSize;
var heightInBlocks = height/blockSize;

// Draw Canvas border and later include paths here
var drawBorder = function(){
    ctx.fillStyle = "Gray"; // include a math.random (rbg) to randomize wall color
    ctx.fillRect(0, 0,width, blockSize); //come back and see if this can be created using variable paramenters and contructor
    ctx.fillRect(0, height - blockSize,width, blockSize); //come back and see if this can be created using variable paramenters and contructor
    ctx.fillRect(0, 0,blockSize, height); //come back and see if this can be created using variable paramenters and contructor
    ctx.fillRect(width - blockSize, 0, blockSize,height); //come back and see if this can be created using variable paramenters and contructor
};
drawBorder();

// set score

var score = 0;

// draw score on canvas using .fillText method
var drawScore = function(){
    ctx.font = "20px Courier";
    ctx.fillStyle = "blue";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
    
};

// draw and cache the circle function
var circle = function (x,y, radius, fillCircle){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    if (fillCircle){
        ctx.fill();
     } else{
         ctx.stroke();

        }
    };
 //Build a constructor/protype
 //come back and use an if statement refactor drawSquare and drawCircle prototypes (add a parameter)
 var Block = function(col,row){
     this.col = col;
     this.row = row;
 };

  //create the square unit from block protype. This will be used to redraw after each canvas erase
 Block.prototype.drawSquare = function(color){
     var x = this.col*blockSize;
     var y = this.row*blockSize;
     ctx.fillStyle = color;
     ctx.fillRect(x, y, blockSize, blockSize);
 };
 
 //draw a circle at 'this' block's loction
 Block.prototype.drawCircle = function(color){
     var Cx = this.col*blockSize + blockSize/2;
     var Cy = this.row*blockSize + blockSize/2;
     ctx.fillStyle = color;
     circle(Cx, Cy, blockSize/2, true);
 };
  
  //function to check if block is the same loction as another block

  Block.prototype.equal = function (otherBlock){
      return this.col === otherBlock.col && this.row === otherBlock.row;
  };
// animate and cache setInterval for end game event

var intervalId = setInterval(function (){
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);

  // allocate cordinates for the snake using the block prototype
  //check if you can randomize the starting position and/or lenght of snake 
  // check is you can us an loop to create the block array
  var Snake = function(){ 
      this.segments = [
          new Block(7,5),
          new Block(6,5),
          new Block(5,5),
      ];
      this.direction = "right";
      this.nextDirection = "right";
  };

  // add a draw protype to the Snake constructor that will be used to redraw each square segment after each run
  Snake.prototype.draw = function (){
      for (var i = 0; i < this.segments.length; i++) {
          this.segments[i].drawSquare("Blue");
      }
    };

// set the snake next direction based on keyboard event

Snake.prototype.setDirection = function (newDirection) {
    if ( this.direction === "up" && newDirection === "down"){
        return;
    }
    if ( this.direction === "up" && newDirection === "down"){
        return;
    }
    if ( this.direction === "up" && newDirection === "down"){
        return;
    }
    if ( this.direction === "up" && newDirection === "down"){
        return;
    }
this.nextDirection = newDirection;
};

// check collision. Are two objects in the same coordinates?
//check how to make the collision function a blueprint for multiple object collision check

//decide and set snake's next direction based on keyboard

//create new head and add it to the to the begining of the block --- using/adding the move method
// direction key pressed will decide where in the cell the new box will be attched => decide direction, then add new cell
Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;
    this.direction = this.nextDirection;

    if (this.direction === "right"){
        newHead = new Block(head.col +1, head.row);
    }
    if (this.direction === "down"){
        newHead = new Block(head.col, head.row) + 1;
    }
    if (this.direction === "left"){
        newHead = new Block(head.col - 1, head.row);
    }
    if (this.direction === "up"){
        newHead = new Block(head.col, head.row -1);
    }
    if(this.checkCollision(newHead)){
        drawGameOver();
        return;
    }
    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)){
        score++;
        apple.move();
    }
    else {
        this.segments.pop();
    }
};


Snake.prototype.checkCollision = function(head) {
    var leftCollision = (head.col === 0);
    var topCollision = (head.row === 0);
    var rightCollision = (head.col === widthInBlocks - 1);
    var downCollision = (head.row === heightInBlocks -1);

    var wallCollision = leftCollision || topCollision || rightCollision || downCollision;

    var selfCollission = false;

    for (var i = 0; i < this.segments.length; i++){
        if(head.equal(this.segments[i])){
            selfCollission = true;
        }
    }
    return wallCollision || selfCollission;
};

 // create the apple constructor
var Apple = function () {
    this.position = new Block(10, 10);
};
// draw apple as circle at apple's location

Apple.prototype.draw = function () {
    this.position.drawCircle("purple");
};
 
// move apple to a random position when in same cordinates as head

Apple.prototype.move = function (){
    var randomCol = Math.floor(Math.random()* (widthInBlocks - 2)) + 1;
    var randomRow = Math.floor(Math.random()* (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
};

//create snake and apple object

var snake = new Snake();
var apple = new Apple();

 //keydown listener for direction
 var directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};


  window.addEventListener('keydown', function(event){
    var newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
    });

// draw game over becuase it is a copy of the drawScore with the addition of the clear canvers function
var drawGameOver = function(){
    clearInterval(intervalId );
    ctx.font = "70px Courier";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width/2, height/2);
    
};

    // document.addEventListener('keydown',function (event) {
    //     console.log(directions[event.keyCode]);
    //    });
// // helper function to make a two dimentional array that takes a number and the dimentions of the array
// function createArray(num, dimensions) {
//     var array = [];
//     for (var i = 0; i < dimensions; i++) {
//       array.push([]);
//       for (var j = 0; j < dimensions; j++) {
//         array[i].push(num);
//       }
//     }
//     return array;
//   }

// //   lets create a randomly generated map for our dungeon crawler
//   function createMap() {
//     let dimensions = 5, // width and height of the map
//       maxTunnels = 3, // max number of tunnels possible
//       maxLength = 3, // max length each tunnel can have
//       map = createArray(1, dimensions), // create a 2d array full of 1's
//       currentRow = Math.floor(Math.random() * dimensions), // our current row - start at a random spot
//       currentColumn = Math.floor(Math.random() * dimensions), // our current column - start at a random spot
//       directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
//       lastDirection = [], // save the last direction we went
//       randomDirection; // next turn/direction - holds a value from directions

//     // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
//     while (maxTunnels && dimensions && maxLength) {

//       // lets get a random direction - until it is a perpendicular to our lastDirection
//       // if the last direction = left or right,
//       // then our new direction has to be up or down,
//       // and vice versa
//       do {
//          randomDirection = directions[Math.floor(Math.random() * directions.length)];
//       } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

//       var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
//         tunnelLength = 0; //current length of tunnel being created

// 		// lets loop until our tunnel is long enough or until we hit an edge
//       while (tunnelLength < randomLength) {

//         //break the loop if it is going out of the map
//         if (((currentRow === 0) && (randomDirection[0] === -1)) ||
//             ((currentColumn === 0) && (randomDirection[1] === -1)) ||
//             ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
//             ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
//           break;
//         } else {
//           map[currentRow][currentColumn] = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
//           currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
//           currentColumn += randomDirection[1];
//           tunnelLength++; //the tunnel is now one longer, so lets increment that variable
//         }
//       }

//       if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
//         lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
//         maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
//       }
//     }
//     return map; // all our tunnels have been created and our map is complete, so lets return it to our render()
//   };
