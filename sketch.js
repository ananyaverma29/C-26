const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player);

  board1 = new Board(width-300, 330, 50, 200);
  board2 = new Board(width-550, height-300, 50,200);

  playerArcher = new PlayerArcher(
    320,250,100,100
  );
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  
  }
  for (var i = 0; i < playerArrows.length; i++) {
  
    collisionWithBoard(i);
    

  }

  board1.display();
  board2.display();

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}
function collisionWithBoard(index)
{
for(var i=0; i< playerArrows.length; i++)
{
  if(playerArrows[i] !== undefined)
  {
    playerArrows[i].display();
    var board1Collision = Matter.SAT.collides(
    board1.body,
    playerArrows[i].body
    );
    var board2Collision = Matter.SAT.collides(
      board2.body,
      playerArrows[i].body
    );
    if(board1Collision.collided || board2Collision.collided){
      console.log("Collided");
    }
}
}
}


      
      





function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
