console.log("linked");


  canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  ctx = canvas.getContext("2d");

  document.body.appendChild(canvas);

var brickBreaker = {



init : function() {

},




};













//// adding paddle \\\

// var myGamePiece;

// function startGame() {
//     myGamePiece = new paddle(
//       120, 20, "red",
//       canvas.width/2 - 60,
//       canvas.height-50
//     );
// }

// ///adding ball\\\
// var dx = 7;
// var dy = -7;

// var ball = {
//   x:        canvas.width/2,
//   y:        canvas.height/2,
//   radius:   10,
//   velocity: 10,
//   render: function() {
//     ctx.fillStyle = 'black';
//     ctx.beginPath();

//     ctx.arc(
//         this.x,
//         this.y,
//         this.radius,
//         0,
//         Math.PI*2,
//         false
//     );
//     ctx.closePath();
//     ctx.fill();
//       if(this.x + dx > canvas.width  - ball.radius || this.x + dx < ball.radius) {
//         dx = -dx;
//       }
//       if(this.y + dy > canvas.height - ball.radius || this.y + dy < ball.radius) {
//         dy = -dy;
//       }


//       ball.x += dx;
//       ball.y += dy;
//   }
// }

// //// adding bricks\\\\
// var brickRowCount = 7;
// var brickColumnCount = 5;
// var brickWidth = 75;
// var brickHeight = 20;
// var brickPadding = 10;
// var brickOffsetTop = 30;
// var brickOffsetLeft = 200;
// var bricks = [];

// for(c = 0; c < brickColumnCount; c++) {
//     bricks[c] = [];
//     for(r = 0; r < brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 };
//       }
//     }
//   function drawBrick() {
//     for(c = 0; c < brickColumnCount; c++) {
//         for(r = 0; r < brickRowCount; r++) {
//           if(bricks[c][r].status == 1) {
//             var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//             var brickY = (r * (brickHeight +brickPadding)) + brickOffsetTop;
//             bricks[c][r].x = brickX;
//             bricks[c][r].y = brickY;
//             ctx.beginPath();
//             ctx.beginPath();
//             ctx.rect(brickX, brickY, brickWidth, brickHeight);
//             ctx.fillStyle = "#F0BC3C";
//             ctx.fill();
//             ctx.closePath();
//     }
//   }
//   }
// }


// function render() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = myGamePiece.color;
//     ctx.fillRect(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
//     ball.render();
//     drawBrick();
//     collisionDet();
//     renderScore();


// }

// setInterval(function() {
//   render();
// }, 1000/70);

// function collisionDet() {
//   if((ball.y + ball.radius) > myGamePiece.y  && ball.x < (myGamePiece.x + myGamePiece.width) && ball.x > myGamePiece.x) {
//    dy = -dy;
//  }
//   bricks.forEach(function(row, index) {
//     row.forEach(function(brick, index){
//       if(brick.x < (ball.x + ball.radius) &&  (ball.x - ball.radius) < brick.x + brickWidth &&
//       brick.y <= (ball.y + ball.radius) && (ball.y - ball.radius) <= (brick.y + brickHeight)) {
//         dy = -dy;
//         brick.status = 0;
//         console.log(brick);
//         score++;
//       }


//       }
//     )}
//   )}

// var score = 0;

// function renderScore() {
//   ctx.font = "18px Open Sans Condensed";
//   ctx.fillStyle = "#b3ffcc";
//   ctx.fillText("Score: " +score, 10, 30);
// }





// function paddle(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.color = color;
// }




// ////keyboard\\\\
// function KeyboardController(keys, repeat) {
//     // Lookup of key codes to timer ID, or null for no repeat
//     //
//     var timers= {};
//     // When key is pressed and we don't already think it's pressed, call the
//     // key action callback and set a timer to generate another one after a delay
//     //
//     document.onkeydown= function(event) {
//         var key= (event || window.event).keyCode;
//         if (!(key in keys))
//             return true;
//         if (!(key in timers)) {
//             timers[key]= null;
//             keys[key]();
//             if (repeat!==0)
//                 timers[key]= setInterval(keys[key], repeat);
//         }
//         return false;

//     };
//     // Cancel timeout and mark key as released on keyup
//     //
//     document.onkeyup= function(event) {
//         var key= (event || window.event).keyCode;
//         if (key in timers) {
//             if (timers[key]!==null)
//                 clearInterval(timers[key]);
//             delete timers[key];
//         }
//     };
//     // When window is unfocused we may not get key events. To prevent this
//     // causing a key to 'get stuck down', cancel all held keys
//     //
//     window.onblur= function() {
//         for (key in timers)
//             if (timers[key]!==null)
//                 clearInterval(timers[key]);
//         timers= {};
//     };
// };

// KeyboardController({
//   // left
//     37: function() {
//       myGamePiece.x -= 20;
//       if (myGamePiece.x < 0) myGamePiece.x = 0;
//     },
//   // up
//     // 38: function() { myGamePiece.vel += .1; },
//   // right
//     39: function() {
//       myGamePiece.x += 20;
//       if (myGamePiece.x + myGamePiece.width > canvas.width) myGamePiece.x = canvas.width - myGamePiece.width;
//     },
//   // down
//     // 40: function() { myGamePiece.vel -= .1; }
// }, 50);
// startGame();
