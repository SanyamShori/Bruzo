var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bruzo;

var ground;

var treat;
var cat;

var score=0;

function preload(){
  
  bruzoImg = loadImage("bruzo.png");
  
  treatImg = loadImage("treat.png");
  
  catImg = loadImage("cat.png");
  
  jumpSound = loadSound("jump.mp3");
  
  treatSound = loadSound("treat.mp3");
  
  loseSound = loadSound("lose.mp3");
  
  bruzoSound = loadSound("bruzo.mp3");
  
}

function setup() {
  createCanvas(400,400);
  
  
  bruzo = createSprite(50,380,20,50);
  bruzo.addImage(bruzoImg);
  bruzo.scale = 0.2;
  
  ground = createSprite(400,400,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.shapeColor = "green";  
  
  treatGroup = new Group();
  catGroup = new Group();
  
  score = 0;
  
   bruzoSound.play();
}

function draw() {
  
  background(255);
  
  if (gameState===PLAY){
    
    if(ground.x<0) 
    {
    ground.x=ground.width/2;
    }
    
    if(treatGroup.isTouching(bruzo))
    {
    treatGroup.destroyEach();
    score = score + 1;
    treatSound.play();
    }
    
    if(keyDown("space") && bruzo.y >= 359) 
    {
      bruzo.velocityY = -15;
      jumpSound.play();
    }
    bruzo.velocityY = bruzo.velocityY + 0.8;
    
  }
  
    bruzo.collide(ground);
    spawnTreats();
    spawnCats();
 
    if(catGroup.isTouching(bruzo)){ 
       catGroup.destroyEach();
       gameState = END;
       loseSound.play(); 
    }
  
    else if(gameState === END) 
    {
    
      //set velcity of each game object to 0
      ground.velocityX = 0;
      bruzo.velocityY = 0;
      catGroup.setVelocityXEach(0);
      treatGroup.setVelocityXEach(0);
    
      //set lifetime of the game objects so that they are never       destroyed
      treatGroup.setLifetimeEach(-1);
      catGroup.setLifetimeEach(-1);
    
    
  }
  
  drawSprites();
  
  text("Treats Collected: " + score,210,30);  
}

function spawnTreats () {
   if(frameCount % 250 === 0) {
    var treat = createSprite(400,325,10,40);
    treat.addImage(treatImg);
     
    treat.scale = 0.2;
    treat.velocityX = -3;
    
    //assign scale and lifetime to the banana           
    treat.lifetime = 170;
    //add each banana to the group
    treatGroup.add(treat);
  }
}

function spawnCats() 
{
  if(frameCount % 130 === 0) {
    var cat = createSprite(400,375,10,40);
    cat.addImage(catImg);
    
    cat.velocityX = -3;
    cat.scale = 0.2;
    
    //assign scale and lifetime to the obstacle           
    cat.lifetime = 170;
    //add each treat to the group
    catGroup.add(cat);
  }
}

  
