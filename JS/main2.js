

canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

var myPaddle = new Paddle(500, 100, 10, 225, 225, 225);
var myBall   = new Ball(300, 400, 0, 4, 10);
// myBrick[] box = new Brick[total]; //Initialize the array that will hold all the bricks

var box = [];
var rows = 7;
var columns = 5;
var total = rows * columns; ///// total number of bricks
var score = 0;
var gameScore = 0;
var lives = 0;

function setup () {
  // set up array of bricks on screen\\
  for(var i = 0; i < rows; i++) {
    box[i] = [];
    for(var j = 0; j < columns; j++) {
      box[i].push(new Brick((i + 1) * 50/(rows + 2), (j + 1) * 25));
    }
  }
}

function draw() {
  // drawing of bricks from array \\
    // box.update();

    //draw of ball and brick\\
    myPaddle.update();
    myBall.update();

    /// ball hits left of paddle\\\
  if(myBall.y == myPaddle.y && myBall.x > myPaddle.x  && myBall.x <= myPaddle.x + (myPaddle.w/2)) {
    myBall.goLeft();
    myBall.changeY();
  }
  ////if ball hits right of paddle\\\
  if(myBall.y == myPaddle.y && myBall.x > myPaddle.x + (myPaddle.w/2) && myBall.x <= myPaddle.x + myPaddle.w ) {
    myBall.goRight();
    myBall.changeY();
  }
  //// ball hit right wall \\\\
  if(myBall.x + myBall.R / 2 >= canvas.width) {
    myBall.goLeft();
  }
  //// ball hit left of wall \\\
  if(myBall.x - myBall.R / 2 <= 0) {
    myBall.goRight();
  }
  ////if ball hit ceiling\\\
  if(myBall.y - myBall.R / 2 <= 0) {
    myBall.changeY();
  }

  ///// ball hitting bot brick move down\\\
  // for(var i = 0; i < rows; i++) {
  //   for (var j = 0; j < columns; j++)
  //   if (myBall.y - myBall.R / 2 <= box[i][j].y + box[i][j].h &&  myBall.y - myBall.R/2 >= box[i][j].y && myBall.x >= box[i][j].x && myBall.x <= box[i][j].x + box[i][j].w  && box[i][j].hit == false ) {
  //     myBall.changeY();
  //     box[i][j].gotHit();
  //     score += 1;
  //     gameScore += 10;
  //   }
  // //// ball hitting top of brick bounce up\\\\
  //   if(myBall.y + myBall.R / 2 >= box[i][j].y && myBall.y - myBall.R /2 <= box[i][j].y + box[i][j].h/2 && myBall.x >= box[i][j].x && myBall.x <= box[i][j].x + box[i][j].w && box[i][j].hit == false ) {
  //     myBall.changeY();
  //     box[i][j].gotHit();
  //     score += 1;
  //     gameScore += 10;
  //   }
  //   //if ball hits the left of the brick, ball switches to the right, and moves in same direction\\\\
  //   if(myBall.x + myBall.R / 2 >= box[i][j].x && myBall.x + myBall.R / 2 <= box[i][j].x + box[i][j].w / 2 && myBall.y >= box[i][j].y && myBall.y <= box[i][j].y + box[i][j].h  && box[i][j].hit == false) {
  //     myBall.goLeft();
  //     box[i][j].gotHit();
  //     score += 1;
  //     gameScore += 10;
  //   }
  //   //if ball hits the right of the brick, ball switches to the left, and moves in same direction\\
  //   if(myBall.x - myBall.R/2 <= box[i][j].x + box[i][j].w && myBall.x +myBall.R / 2 >= box[i][j].x + box[i][j].w / 2 && myBall.y >= box[i][j].y && myBall.y <= box[i][j].y + box[i][j].h  && box[i][j].hit == false) {
  //     myBall.goRight();
  //     box[i][j].gotHit();
  //     score += 1;
  //     gameScore += 10;
  //   }
  //   /// if ball goes off screen, reset ball and lose life \\\
  //   if(myBall.y > height) {
  //     myBall.reset();
  //     lives -= 1;
  //   }
  // }
  //   //Displays score in top left corner!
  // textSize(32);
  // text(gameScore, 10, 30);

  // //Displays lives in bottom left corner
  // textSize(18);
  // text("LIVES: ", 10, 570);
  // text(lives, 70, 570);

  //If the player wins/loses, click the mouse to restart the game.\\\
  if (score == total || lives <= 0) {
    resetGame();
  }
  //Once the score is equal to the total, bring up the "game over" screen.\\\
  if (score == total){
    gameWin();
  }

  //If no more lives are left, game ends
  if (lives <= 0){
    gameLose();
  }
}

//Function that displays the game screen after the player loses.
function gameLose() {
  //Says "Game over", displays score, and allows user to click screen to play again.
  background(0);
  textSize(32);
  text("GAME OVER", 100, 200);
  text("Score: ", 100, 300);
  text(gameScore, 300, 300);
  text("Click mouse to play again!", 100, 500);


  //help to isolate the ball.
  myBall.x = -10;
  myBall.y = -10;
  myBall.vx = 0;
  myBall.vy = 0;
}

//Function that displays the gameOver screen
function gameWin() {

  //Says "You win!", displays score,  and allows user to click screen to play again.
  background(0);
  textSize(32);
  text("YOU WIN!", 100, 200);
  text("Score: ", 100, 300);
  text(gameScore, 300, 300);
  text("Click mouse to play again!", 100, 500);

  myBall.x = -10;
  myBall.y = -10;
  myBall.vx = 0;
  myBall.vy = 0;
}


//Function that Resets the game
function resetGame() {

  //Setup array of all bricks on screen
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      box[i][j] = new Brick((i+1) * canvas.width / (rows + 2), (j +1 ) * 50);
    }
  }

    //Reset all the score values
    score = 0;
    gameScore = 0;
    lives = 5;

  //Reset the ball as well
  myBall.reset();
}


// fill style func
function fill(r, g, b) {
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
}

// create rect func
function rect(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

////paddle
function Paddle(x, y, w, h, r, g, b)  {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.r = r; // red value
  this.g = g; // green value
  this.b = g; // blue value
}



Paddle.prototype.update = function() {
  fill(this.r, this.g, this.b);
  rect(this.x, this.y, this.w, this.h);
}

///ball \\\\
function Ball(x, y, vx, vy, R) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.R = R; // ball radius
}

Ball.prototype.update = function() {
  ctx.fillStyle = 'black';
    ctx.beginPath();

    ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI*2,
        false
    );
    ctx.closePath();
    ctx.fill();
}


  /// update ball

  /// if ball goes left
  // this.goLeft =
  // /// if ball goes right
  // function goRight() {
  //   vx = 4;
  // }

  // //// ball changes in y direction
  // function changeY() {
  //   vy *= -1
  // }
  /////reset if ball goes below paddle
Ball.prototype.reset = function reset() {
  this.x  = 300;
  this.y  = 400;
  this.vx = 0;
  this.vy = 4;
}



/// bricks \\\
function Brick(x, y) {
  this.x = x; //brick x
  this.y = y; //brick y
  this.w = 50; //brick width
  this.h = 25; //brich height
  this.r = Math.floor(255 - (Math.random() * 128)); //brick red val
  this.g = Math.floor(255 - (Math.random() * 128)); //grick green val
  this.b = Math.floor(255 - (Math.random() * 128)); //brick blue val

  this.hit = false; //better detection for collision than before
}

  //Draws the brick
Brick.prototype.update = function update() {
  fill(this.r, this.g, this.b);
  rect(this.x, this.y, this.w, this.h);
}

/// brick gets hit \\
Brick.prototype.gotHit = function goHit() {
  this.hit = true
  this.r = 0;
  this.g = 0;
  this.b = 0;
  rect(x, y, w, h);
}
