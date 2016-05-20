console.log("linked");



canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

//// adding paddle \\\

var myGamePiece;

function startGame() {
    myGamePiece = new paddle(
      120, 20, "red",
      canvas.width/2 - 60,
      canvas.height-50
    );
    setInterval(function() {
      render();
    }, 1000/70);
}

///adding ball\\\
var moving = false;
var dx = 4;
var dy = -4;
var ball = {
  x:        canvas.width/2,
  y:        canvas.height/2,
  radius:   10,
  velocity: 10,
  render: function() {
    if (paused) return;
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
    moving = true;
      if(this.x + dx > canvas.width  - ball.radius || this.x + dx < ball.radius) {
        dx = -dx;
      }
      if(this.y + dy > canvas.height - ball.radius || this.y + dy < ball.radius) {
        dy = -dy;
      }


      ball.x += dx;
      ball.y += dy;
  }
}

//// adding bricks\\\\
var brickRowCount = 7;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 200;
var bricks = [];

for(c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBrick() {
  if (paused) return;
  for(var c = 0; c < bricks.length; c++) {
    for(var r = 0; r < bricks[c].length; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight +brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#F0BC3C";
        ctx.fill();
        ctx.closePath();
      } else {
        bricks[c][r] = 0;
      }
    }
  }
}

function collisionDet() {
  if (paused) return;
  if((ball.y + ball.radius) > myGamePiece.y  && ball.x < (myGamePiece.x + myGamePiece.width) && ball.x > myGamePiece.x) {
    dy = -dy;
  }
  bricks.forEach(function(row, i) {
    row.forEach(function(brick, ind){
      if (brick.x < (ball.x + ball.radius) &&  (ball.x - ball.radius) < brick.x + brickWidth &&
      brick.y <= (ball.y + ball.radius) && (ball.y - ball.radius) <= (brick.y + brickHeight)) {
        dy = -dy;
        brick.status = 0;
        brick.x = 0;
        brick.y = 0;
        score++;
        if(score == brickRowCount*brickColumnCount) {
          alert("YOU WIN, CONGRATS!");
          document.location.reload();
        }
      };
    });
  })
}

var score = 0;

function renderScore() {
  if (paused) return;
  ctx.font = "18px Open Sans Condensed";
  ctx.fillStyle = "#b3ffcc";
  ctx.fillText("Score: " +score, 10, 30);
}

var lives = 3;

function renderLives() {
  if (paused) return;
  ctx.font = "18px Open Sans Condensed";
  ctx.fillStyle = "#b3ffcc";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}




function paddle(width, height, color, x, y) {
  if (paused) return;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
}

var toggle = 'play';
var toggleBtn = document.getElementById('toggleBtn');
var paused = false;

toggleBtn.addEventListener('click', function(event) {
  if (toggleBtn.innerHTML === 'Start') {
    startGame();
    // intervalID = setInterval(render);
    toggleBtn.innerHTML = 'Pause';
  } else {
    toggleBtn.innerHTML = paused ? 'Pause' : 'Resume';
    paused = !paused;
  }
});


////keyboard\\\\
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers= {};
    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown= function(event) {
        var key= (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key]= null;
            keys[key]();
            if (repeat!==0)
                timers[key]= setInterval(keys[key], repeat);
        }
        return false;

    };
    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup= function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };
    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};

KeyboardController({
  // left
    37: function() {
      myGamePiece.x -= 20;
      if (myGamePiece.x < 0) myGamePiece.x = 0;
    },
  // up
    // 38: function() { myGamePiece.vel += .1; },
  // right
    39: function() {
      myGamePiece.x += 20;
      if (myGamePiece.x + myGamePiece.width > canvas.width) myGamePiece.x = canvas.width - myGamePiece.width;
    },
  // down
    // 40: function() { myGamePiece.vel -= .1; }
}, 50);
function render() {
  if (paused) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
    ball.render();
    drawBrick();
    collisionDet();
    renderScore();
    renderLives();
     if(ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius) {
        dx = -dx;
    }
    if(ball.y + dy < ball.radius) {
        dy = -dy;
    }
    else if(ball.y + dy > canvas.height - ball.radius) {
        if(ball.x + ball.radius > paddle.x && ball.x < paddle.x + paddle.width) {
            dy = -dy;
        } else {
          lives--;
          if (lives == 0) {
            alert("GAME OVER! YOU LOSE SUCKA!");
            console.log("you died")
            document.location.reload();
          } else {
              ball.x = canvas.width/2;
              ball.y = canvas.height-100;
              console.log(dy);
              dy = -(Math.abs(dy));

              paddle.x = (canvas.width - paddle.width)/2;
          }
        }
    }

    // x += dx;
    // y += dy;
    // // requestAnimationFrame(draw);
}
// startGame();
