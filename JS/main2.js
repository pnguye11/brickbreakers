canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

myPaddle = new Paddle(); //initialize paddle
myBall = new Ball(); //initialize ball
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
