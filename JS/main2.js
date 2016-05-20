canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

myPaddle = new Paddle();
myBall = new Ball();
myBrick[] box = new Brick[total]; //Initialize the array that will hold all the bricks

var row = 7;
var columns = 5;
var total = rows * columns; ///// total number of bricks
var score = 0;
var lives = 0;

function setup () {

  // set up array of bricks on screen\\
  for( var i = 0; i < rows; i++) {
    for( var j = 0; i < columnsl; j++){
      box[i * rows + j] = new Bricks((i + 1) * width/(row + 2), (j + 1) * 50);
    }
  }
}

function draw() {
  // drawing of bricks from array \\
  for(var i =0; i < total; i++) {
    box[i].update();

    //draw of ball and brick\\
    myPaddle.update();
    myBall.update();


  }
}
///ball \\\\
class Ball {
  float x;
  float y;
  float vx;
  float vy;
  float D; // ball diameter

  Ball() {
    x  = 300;
    y  = 400;
    vx = 0;
    vy = 4; //(velocity of ball)
    D  = 10; ////praying diameter is easier than radius for collision

  }

  /// update ball
  function update() {
    noStroke();
    fill(225);
    ellipse(x, y, D, D);

    y += vy; // increment y
    x += vx; // increment x
  }
  /// if ball goes left
  function goLeft() {
    vx = -4;
  }
  /// if ball goes right
  function goRight() {
    vx = 4;
  }

  //// ball changes in y direction
  function changeY() {
    vy *= -1
  }
  /////reset if ball goes below paddle
  function reset() {
    x  = 300;
    y  = 400;
    vx = 0;
    vy = 4;
  }
}


/// bricks \\\
class Brick {
  float x; //brick x
  float y; //brick y
  float w; //brick width
  float h; //brich height
  float r; //brick red val
  float g; //grick green val
  float b; //brick blue val

  boolean hit; //better detection for collision than before

  Brick(float x0, float y0) {
    x = x0;
    y = y0;

    //pastel colors
    r = random(128, 255);
    g = random(128, 255);
    b = random(128, 255);
    w = 50; //brick width
    h = 25; //brick height

    hit = false; //brick is initially not hit
  }

  //Draws the brick
  function update()
  {
    noStroke();
    fill(r, g, b);
    rect(x, y, w, h);
  }
}
