var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var monkey ;
var monkeyAni ;
var ground ;
var score ;
var survivalTime ;
var banana ; 
var bananaImg ;
var bananaGroup ;
var obstacle ;
var obstacleImg ;
var obstaclesGroup ;


function preload() {
  monkeyAni = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png") ;
  bananaImg = loadImage("banana.png") ;
  obstacleImg = loadImage("obstacle.png") ;
}

function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(50,300,20,20) ;
  monkey.addAnimation("running" , monkeyAni );  
  monkey.scale = 0.1 ;
  //monkey.debug = true ;
  
  ground = createSprite(200,330,400,10);
  ground.depth = -10 ;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
    
  score = 0 ;
  survivalTime = 0 ;
}

function draw() {
  background(220) ;
  
  stroke("black") ;
  fill("black") ;
  text("Score : "+ score, 280,70);
  text("Survival Time : "+ survivalTime, 280,50);
  
  
  
  
 if(gameState === PLAY){
   
   if(keyDown("space")&& monkey.y >= 290) {
        monkey.velocityY = -12 ;
   }
   monkey.velocityY = monkey.velocityY + 0.8 ;
   
   if(bananaGroup.isTouching(monkey)) {
     bananaGroup.destroyEach() ;
     score = score + 1 ;
   }
      
  
   survivalTime = Math.ceil(frameCount/frameRate())
   text("Survival Time : "+ survivalTime, 280,50);
   
   spawnBanana() ;
   spawnObstacle() ;
   
   if(obstaclesGroup.isTouching(monkey)) {
     gameState = END ;
   }
   
 }
   else if (gameState === END) {
     ground.velocityX = 0 ;
     monkey.velocityY = 0 ;
     
     
     textSize(20)
     text("GAME OVER" , 150,150 ) ;
     textSize()
     text("Press R To Restart" , 130,200)
     
     
     obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     
    
    
 }
  
  if(keyDown("r")) {
   restart() ;
  }

  monkey.collide(ground) ;
  
drawSprites() ; 
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,230,10,10);
     var rand = Math.round(random(400,280));
     banana.addImage(bananaImg) ;
     banana.velocityX = -6 ;
     banana.lifetime = 100;
     banana.scale = 0.1 ;
    
    bananaGroup.add(banana);
  }   
}
  
function spawnObstacle() {
  if (frameCount % 200 === 0){
   var obstacle = createSprite(400,310,10,40);
    var rand = Math.round(random(80,120));
    obstacle.addImage(obstacleImg) ;
    obstacle.velocityX = -6 ;   
    obstacle.scale = 0.1 ;
    obstacle.lifetime = 100 ;
    obstacle.depth = 10 ;
    //obstacle.debug = true ;
    obstacle.setCollider("circle" , 0,0,150 ) ;
  
    
    
    obstaclesGroup.add(obstacle);
  }
  
}

function restart() {
    gameState = PLAY ;
    score = 0 ;
    obstaclesGroup.destroyEach() ;
    bananaGroup.destroyEach() ;
}
  