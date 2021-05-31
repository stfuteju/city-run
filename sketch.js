PLAY=1;
END=0;
var gameState=PLAY;

var ground,groundImg;
var girl,girlImg;
var thief,thiefImg,thievesGroup;
var restart,restartImg;
var JoyMusicSound;

function preload(){
groundImg=loadImage("ground2.png");
//var name=loadImage("name of the pic")
bgImg=loadImage("bg.png");
  girlImg=loadAnimation("girl1.png","girl2.png","girl3.png");
  thiefImg=loadAnimation("thief1.png","thief2.png","thief2.png");
  restartImg=loadImage("restart.png");
  JoyMusicSound=loadSound("JoyMusic.mp3");
} 

function setup(){
  createCanvas (600,200);
  ground=createSprite(200,190,400,100);
  ground.addImage("ground",groundImg);
  //sprite.addImage("label",var name);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  // ground.visible=false
  girl=createSprite(50,140,20,70);
  girl.addAnimation("running",girlImg);
  girl.scale=0.4;
  girl.debug=true
  restart=createSprite(20,20,10,10);
  restart.addImage(restartImg);
  restart.scale=0.3;
  girl.setCollider("rectangle",0,0,50,210)
  
  invisibleGround = createSprite(200,190 ,400,10);
  invisibleGround.visible = false;
  
  score=0;
  thievesGroup=new Group();
  
}


function draw(){
  background(bgImg);
  // JoyMusicSound.play();
 
  text("score "+ score,500,50);
  if(gameState==PLAY){
    
  restart.visible=false;
  score=score+1;
  
  if(ground.x<0){
 ground.x=ground.width/2;
    
  }
  
   if(keyDown("space")){
     
    girl.velocityY=-10; 
     
  }
  girl.velocityY=girl.velocityY+0.8;
  
 if(thievesGroup.isTouching(girl)){
    girl.velocityX=0;
    gameState=END;
   thievesGroup.setVelocityXEach(0);
    
    
  }
  }
  else if(gameState==END){
    textSize(30);
    
    strokeWeight(30);
    stroke("pink");
    text("Game Over",200,100);
    restart.visible=true;
if(mousePressedOver(restart)){
  reset();
}
  }
  spawnThief();
  girl.collide(invisibleGround);
  
  drawSprites();
  
  
  
}

function spawnThief(){
  if(frameCount%200==0){
  thief=createSprite(550,160,20,-50);
  thief.addAnimation("robbing",thiefImg);
  thief.scale=0.4;
  thief.velocityX=-5;
 thief.collide(invisibleGround);
  thievesGroup.add(thief);
  } 
}
function reset(){
gameState=PLAY;
thievesGroup.destroyEach();
score=0;
restart.visible=false;
  
  
  
  
}

