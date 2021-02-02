var bg,continueButtonFlag=true,gameState=0,bg1;
var play,playImg,continueButton,continueImg;
var hanuman,hanumanAnimation,jumpAnimation,sitAnimation;
var invisibleGround;
var villan1,villan2,villan3,villan4;
var villan1Group,villan2Group,villan3Group,villan4Group;


function preload(){
  bg=loadImage("images/jai hanuman.jpg");
  bgRing=loadImage("images/ring giving to hanuman.png");
  bgForest=loadImage("images/forest.jpg");
  playImg=loadImage("images/play.png");
  continueImg=loadImage("images/continue.png");
  hanumanAnimation=loadAnimation("images/hanuman3.png","images/hanuman4.png","images/hanuman5.png","images/hanuman6.png","images/hanuman7.png","images/hanuman8.png");
  jumpAnimation=loadAnimation("images/hanuman2.png");
  sitAnimation=loadAnimation("images/hanuman1.png");
  villan1=loadAnimation("images/villan1.png","images/villan2.png","images/villan3.png","images/villan4.png","images/villan5.png","images/villan6.png","images/villan7.png","images/villan8.png","images/villan9.png");
  villan2=loadAnimation("images/devil1.png");
  villan3=loadAnimation("images/devil2.png");
  villan4=loadAnimation("images/devil3.png");

}
function setup() {
  createCanvas(displayWidth-20,755);
 
  bg1=createSprite(width/2,height/2);
  bg1.addImage("hanuman",bg);
  bg1.addImage("ring",bgRing);
  bg1.addImage("forest",bgForest);
  play=createSprite(width/2-50,height/2,60,50);
  play.addImage("Play",playImg);
  invisibleGround=createSprite(width/2,height-10,width,10);
  invisibleGround.visible=false;
  villan1Group=new Group();
  villan2Group=new Group();
  villan3Group=new Group();
  villan4Group=new Group();
  
}

function draw() {
  background(0);
 
  if(gameState===0){
    if(mousePressedOver(play)){
     
      bg1.changeImage("ring",bg);
      bg1.scale=3.57;
      play.destroy();
      if(continueButtonFlag){
        continueButton=createSprite(width/2-20,height/2-100,10,10);
        continueButton.addImage("continue",continueImg);
        continueButtonFlag=false;
      }
      
    }
  
    if(mousePressedOver(continueButton)){
      bg1.changeImage("forest",bgForest);
      bg1.scale=3;
      bg1.x=bg1.width/2;
      bg1.velocityX=-2;

      hanuman=createSprite(100,height-100,10,10);
      hanuman.addAnimation("Running",hanumanAnimation);
      hanuman.addAnimation("jumping",jumpAnimation);
      hanuman.addAnimation("sitting",sitAnimation);
      
      continueButton.destroy();
      gameState=1;
    }
  }else if(gameState===1){
    if(bg1.x<300){
      bg1.x=bg1.width/2;
    }
    console.log(hanuman.y);
    if(hanuman.y>=628){
      hanuman.changeAnimation("Running",hanumanAnimation);
    }
    else{
      hanuman.changeImage("jumping",jumpAnimation);
    }

      if(keyDown(UP_ARROW) && hanuman.y>=628){      
        hanuman.velocityY=-15;
      }
      hanuman.velocityY=hanuman.velocityY+0.5;
      hanuman.collide(invisibleGround);

      if(keyDown(DOWN_ARROW)){
        hanuman.changeAnimation("sitting",sitAnimation);
      }
    
    spawnVillans();

    if(keyDown("a")){
      if(villan1Group.isTouching(hanuman)){
        villan1Group.destroyEach();
      }
      if(villan2Group.isTouching(hanuman)){
        villan2Group.destroyEach();
      }
      if(villan3Group.isTouching(hanuman)){
        villan3Group.destroyEach();
      }
      if(villan4Group.isTouching(hanuman)){
        villan14roup.destroyEach();
      }
    }

  }
 

  drawSprites();
}

function spawnVillans(){
  if(frameCount %300===0){
    var villan=createSprite(width,height-100);
    var rand=Math.round(random(1,4));
    if(rand===1){
      villan.addAnimation("dragon",villan1);
      villan1Group.add(villan);
    }
    else if(rand===2){
      villan.addAnimation("villan2",villan2);
      villan2Group.add(villan);
    }
    else if(rand===3){
      villan.addAnimation("villan3",villan3);
      villan3Group.add(villan);
    }
    else if(rand===4){
      villan.addAnimation("villan4",villan4);
      villan4Group.add(villan);
    }
    
    villan.velocityX=-2;
  }
}