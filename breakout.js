
var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60)
  };
  var canvas = document.createElement("canvas");
  var width = 700;
  var height = 500;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  var player = new Player();
  var ball = [new Ball(350, 250)];
  var score = 0;
  var level = 0;
  var lives = 5;
  var bricks = [];
  var mouseX = 325;
  function reset()
  {
    player = new Player();
    ball = [new Ball(350, 250)];
    score = 0;
    level = 0;
    lives = 5;
    bricks = [];
    mouseX = 325;
  }

    
  var render = function () {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    for(let balls of ball)
    {
      balls.render();
    }
    if(level == 0)
    {
      level++;
      fillBricks();
    }
    var checkIfEmpty = true;
    for(let value of bricks)
    {
      for(let val of value)
      {
        if(val != -1)
        {
          val.render();
          checkIfEmpty = false;
        }
      }
    }
    if(level == 6)
    {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);
      context.font = "50px PixeloidSans"; 
      context.textAlign = "center"; 
      if(checkIfEmpty)
      {
        context.fillStyle = "#00FF00";
        context.fillText("Winner!", width/2, height/2);
      }
      else
      {
        context.fillStyle = "#FF0000";
        context.fillText("Loser!", width/2, height/2);
      }
    }
    if(checkIfEmpty == true && level != 6)
    {
      level++;
      for(let balls of ball)
      {
        balls.x = 350;
        balls.y = 250;
        balls.x_speed = 0;
        balls.y_speed = 3;
      }
      fillBricks();
    }
    context.fillStyle = "white";
    context.font = "20px PixeloidSans"; 
    context.textAlign = "left"; 
    context.fillText("Score: "+score.toString(), 10, 22);
    for(x = 0; x < lives; x++)
    {
      context.beginPath();
      context.arc(width-15-(x*15), 15, 5, 2 * Math.PI, false);
      context.fillStyle = "#0000FF";
      context.fill();
    }
    if(lives == 0)
    {
      level = 6;
    }
  };
  
  var update = function () {
    player.update();
    for(let balls of ball)
    {
      balls.update(player.paddle);
    }
  };
  
  var step = function () {
    update();
    render();
    animate(step);
  };
  
  function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  
  Paddle.prototype.render = function () {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
  };
  
  Paddle.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if (this.x < 0) {
      this.x = 0;
      this.x_speed = 0;
    } else if (this.x + this.width > 700) {
      this.x = 700 - this.width;
      this.x_speed = 0;
    }
  };

  function Player() {
    this.paddle = new Paddle(325, 480, 100, 10);
  }
  
  Player.prototype.render = function () {
    this.paddle.render();
  };
  
  Player.prototype.update = function () {
    if(mouseX > this.paddle.x)
    {
      this.paddle.move(5,0)
    }
    else if(mouseX < this.paddle.x)
    {
      this.paddle.move(-5,0)
    }
    else
    {
      this.paddle.move(0,0)
    }
  };

  function arrayRemove(arr, value) 
  {   
    return arr.filter(function(ele)
    { 
        return ele != value; 
    });
  }
  
  function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
  }
  
  Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, 5, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
  };
  
  Ball.prototype.update = function (paddle1) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;
  
    if (this.x - 5 < 0) {
      this.x = 5;
      this.x_speed = -this.x_speed;
    } else if (this.x + 5 > 700) {
      this.x = 695;
      this.x_speed = -this.x_speed;
    }
    if (this.y < 0) {
        this.y_speed = -this.y_speed;
      }
    if (top_y > 300) {
        if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
            this.y_speed = -3;
            this.x_speed += (paddle1.x_speed / 2);
            this.y += this.y_speed;
        }
      } 
      if (this.y > 520) {
        if(ball.length == 1)
        {
          this.x = 350;
          this.y = 250;
          this.x_speed = 0;
          this.y_speed = 3;
          lives--;
        }
        else
        {
          ball = arrayRemove(ball, this)
        }
      } 
      for(var m = 0; m < bricks.length; m++)
      {
        for(var n = 0; n < bricks[m].length; n++)
        {
          var val = bricks[m][n];
          if (top_y < (val.y + val.height - 3) && bottom_y > val.y+3 && top_x < (val.x + val.width) && bottom_x > val.x) {
            this.x_speed = -this.x_speed;
            Scoring(bricks[m][n]);
            if(bricks[m][n].powerup == 1)
            {
              ball.push(new Ball(350, 250));
            }
            bricks[m][n] = -1;
          }
          else if(top_y < (val.y + val.height) && bottom_y > val.y && top_x < (val.x + val.width - 3) && bottom_x > val.x+3)
          {
            this.y_speed = -this.y_speed;
            Scoring(bricks[m][n]);
            if(bricks[m][n].powerup == 1)
            {
              ball.push(new Ball(350, 250));
            }
            bricks[m][n] = -1;
          }
          else if(top_y < (val.y + val.height) && bottom_y > val.y && top_x < (val.x + val.width) && bottom_x > val.x)
          {
            this.x_speed = -this.x_speed;
            this.y_speed = -this.y_speed;
            Scoring(bricks[m][n]);
            if(bricks[m][n].powerup == 1)
            {
              ball.push(new Ball(350, 250));
            }
            bricks[m][n] = -1;
          }
        }
      }
    
  };
  function Scoring(brickScore)
  {
    var bC = ['#FF00FF', '#0096FF', '#00FF00', '#FFFF00', '#FFA500', '#FF0000']
    if(brickScore.colour == bC[5])
    {
      score += 10;
    }
    else if(brickScore.colour == bC[4])
    {
      score += 20;
    }
    else if(brickScore.colour == bC[3])
    {
      score += 40;
    }
    else if(brickScore.colour == bC[2])
    {
      score += 80;
    }
    else if(brickScore.colour == bC[1])
    {
      score += 160;
    }
    else if(brickScore.colour == bC[0])
    {
      score += 320;
    }

  }

  /**
   * Brick types:
   * red - 10 pt
   * orange - 20 pt
   * yellow - 40 pt
   * green - 80 pt
   * blue - 160 pt
   * purple - 320 pt
   * powerup variant - applies powerup
   * 
   * Powerups: 
   * Extra ball 1
   * Ball gatling 2
   * Double paddle size 3
   * 
   * Powerups last until death
   */

  function Brick(x, y, colour, powerup)
  {
    
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
    this.colour = colour;
    this.powerup = powerup;

  }

  Brick.prototype.render = function () {
    context.fillStyle = this.colour;
    context.fillRect(this.x, this.y, this.width, this.height);
    if(this.powerup == 1)
    {
      context.beginPath();
      context.arc(this.x+this.width/2, this.y+this.height/2, 5, 2 * Math.PI, false);
      context.fillStyle = "#FFFFFF";
      context.fill();
    }
  };

  function fillBricks()
  {
    var bC = ['#FF00FF', '#0096FF', '#00FF00', '#FFFF00', '#FFA500', '#FF0000']
    if(level == 5)
    {
      for(i = 0; i < 6; i++)
      {
        bricks.push([])
        for(o = 0; o < 13; o++)
        {
          var bX = o*51 + 14;
          var bY = i*31 + 25;
          //add this to others
          if(i == 3 && o == 5)
          {
            bricks[i].push(new Brick(bX, bY, bC[i], 1));
            console.log('powerup')
          }
          else
          {
            bricks[i].push(new Brick(bX, bY, bC[i], 0));
          }
        }
      }
      console.log(bricks)
    }
    else if(level == 4)
    {
      for(i = 0; i < 6; i++)
      {
        bricks.push([])
        for(o = 0; o < 13; o++)
        {
          if(o%2 == 0 || i%2 == 0)
          {
            bX = o*51 + 14;
            bY = i*31 + 25;
            bricks[i].push(new Brick(bX, bY, bC[i], 0));
          }
        }
      }
      console.log(bricks)
    }
    else if(level == 2)
    {
      for(i = 0; i < 6; i++)
      {
        bricks.push([])
        for(o = 0; o < 13; o++)
        {
          if(o%2 == 0)
          {
            bX = o*51 + 14;
            bY = i*31 + 25;
            bricks[i].push(new Brick(bX, bY, bC[i], 0));
          }
        }
      }
      console.log(bricks)
    }
    else if(level == 3)
    {
      for(i = 0; i < 6; i++)
      {
        bricks.push([])
        for(o = 0; o < 13; o++)
        {
          if(i%2 == 0 || o%3 == 0)
          {
            bX = o*51 + 14;
            bY = i*31 + 25;
            bricks[i].push(new Brick(bX, bY, bC[i], 0));
          }
        }
      }
      console.log(bricks)
    }
    else if(level == 1)
    {
      for(i = 0; i < 6; i++)
      {
        bricks.push([])
        for(o = 0; o < 13; o++)
        {
          if(i%2 == 0 || o%5 == 1)
          {
            bX = o*51 + 14;
            bY = i*31 + 25;
            bricks[i].push(new Brick(bX, bY, bC[5], 0));
          }
        }
      }
      console.log(bricks)
    }
  }

  
  
  document.body.appendChild(canvas);
  animate(step);

  window.addEventListener("mousemove", function(event)
  {
    mouseX = parseInt(event.clientX);
  });

  window.addEventListener("click", function(event)
  {
    if(level == 6)
    {
      reset();
    }
  });
  
  window.onload = function() 
  {
    document.body.appendChild(canvas);
    animate(step);
  };