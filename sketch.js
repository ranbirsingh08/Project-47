var shooter,shooterImg;

var bg,backgroundImg;

var bg2,background2Img

var bg3,background3Img

var invisibleGround,invisibleGround2;

var zombie,zombieImg;

var ghost,ghostImg

var life=3


var bullet,bulletImg;

var heart1,heart1Img;

var heart2,heart2Img;

var heart3,heart3Img;

var gameState=1

var score=0

var Boss,BossImg

var win,lose,gun



function preload(){
  
backgroundImg=loadImage("assets/background.png")
shooterImg= loadImage("assets/shooter.png")
zombieImg=loadImage("assets/Zombie.png")
bulletImg=loadImage("assets/ammo.png")
heart1Img=loadImage("assets/heart1.png")
heart2Img=loadImage("assets/heart2.png")
heart3Img=loadImage("assets/heart3.png")
ghostImg=loadImage("assets/ghost.png")
background2Img=loadImage("assets/background2.png")
background3Img=loadImage("assets/background3.png")
BossImg=loadImage("assets/Boss_Zombie.png")
gun=loadSound("assets/gun.mp3")
win=loadSound("assets/win.wav")
lose=loadSound("assets/lose.wav")


}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  ghostGroup=new Group()
  zombieGroup=new Group()
  bulletGroup =new Group();
  BossGroup= new Group()

   bg=createSprite(displayWidth,displayHeight/2-40,30,30)
   bg.addImage(backgroundImg)
   bg.scale=3
   bg.velocityX=-4
    
 
  shooter=createSprite(displayWidth-1500,displayHeight-300,50,50)
  shooter.addImage(shooterImg)
  shooter.scale=0.7

  heart1=createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.4
  heart1.visible=false

  heart2=createSprite(displayWidth-100,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.4
  heart2.visible=false
  
  heart3=createSprite(displayWidth-100,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.4


  invisibleGround=createSprite(200,380,3000,20)
  invisibleGround.visible=false
  
  invisibleGround2=createSprite(200,840,3000,20)
  invisibleGround2.visible=false

  invisibleGround3=createSprite(200,890,3000,20)
  invisibleGround3.visible=false
  
  invisibleGround4=createSprite(200,500,3000,20)
  invisibleGround4.visible=false


}





function draw() {
  
  background("black");
  
  if(gameState==1){
    if(bg.x<-40){
      bg.x=1900
    }
   
    if(life==3){
      heart3.visible=true
      heart2.visible=false
      heart1.visible=false
    }

    if(life==2){
      heart3.visible=false
      heart2.visible=true
      heart1.visible=false
    }

    if(life==1){
      heart3.visible=false
      heart2.visible=false
      heart1.visible=true
    }
    
    if(life==0){
      gameState="lost"
      heart3.visible=false
      heart2.visible=false
      heart1.visible=false
    }

    if(keyDown("space")){
      shootBullet();
      gun.play()
    }
  
    if(keyDown(UP_ARROW)){
      shooter.y-=5
    }
    if(keyDown(DOWN_ARROW)){
      shooter.y+=5
    }
  
  
    shooter.collide(invisibleGround)
    shooter.collide(invisibleGround2)
    
    if(bulletGroup.isTouching(zombieGroup)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
         bulletGroup.destroyEach()
          zombieGroup[i].destroy()
          score=score+5
        }
      }
    }


    if(zombieGroup.isTouching(shooter)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(shooter)){
           zombieGroup[i].destroy()
           life=life-1
        }
      }
    }
  
    spawnZombies()
    if(score==25){
      gameState=2
    
    }
    
    
 
  }

    
  
    
 
 


  if(gameState==2){
    bg.destroy()
    background(background2Img)
    zombieGroup.destroyEach()
  
    if(life==3){
      heart3.visible=true
      heart2.visible=false
      heart1.visible=false
    }

    if(life==2){
      heart3.visible=false
      heart2.visible=true
      heart1.visible=false
    }

    if(life==1){
      heart3.visible=false
      heart2.visible=false
      heart1.visible=true
    }

    if(life==0){
      gameState="lost"
      heart3.visible=false
      heart2.visible=false
      heart1.visible=false
    }

    if(keyDown("space")){
      shootBullet();
      gun.play()
    }
  
    if(keyDown(UP_ARROW)){
      shooter.y-=5
    }
    if(keyDown(DOWN_ARROW)){
      shooter.y+=5
    }
  
  
    shooter.collide(invisibleGround4)
    shooter.collide(invisibleGround3)
    
    if(bulletGroup.isTouching(ghostGroup)){
      for(var i=0;i<ghostGroup.length;i++){
        if(ghostGroup[i].isTouching(bulletGroup)){
         bulletGroup.destroyEach()
          ghostGroup[i].destroy()
          score=score+5
        }
      }
    }

    if(ghostGroup.isTouching(shooter)){
      for(var i=0;i<ghostGroup.length;i++){
        if(ghostGroup[i].isTouching(shooter)){
           ghostGroup[i].destroy()
           life=life-1
        }
      }
    }
  
    spawnGhost()

    if(score==50){
      gameState=3
    }
  }

 if(gameState==3){
   background(background3Img)
  

   zombieGroup.destroyEach()
   ghostGroup.destroyEach()



   if(life==3){
    heart3.visible=true
    heart2.visible=false
    heart1.visible=false
  }

  if(life==2){
    heart3.visible=false
    heart2.visible=true
    heart1.visible=false
  }

  if(life==1){
    heart3.visible=false
    heart2.visible=false
    heart1.visible=true
  }

  if(life==0){
    gameState="lost"
    heart3.visible=false
    heart2.visible=false
    heart1.visible=false
  }

  if(keyDown("space")){
    shootBullet();
    gun.play()
  }

  if(keyDown(UP_ARROW)){
    shooter.y-=5
  }
  if(keyDown(DOWN_ARROW)){
    shooter.y+=5
  }
  if(keyDown(RIGHT_ARROW)){
    shooter.x+=5
  }
  if(keyDown(LEFT_ARROW)){
    shooter.x-=5
  }


  shooter.collide(invisibleGround3)

  if(score==300){
    gameState="won"
  }
  

  if(bulletGroup.isTouching(BossGroup)){
    for(var i=0;i<BossGroup.length;i++){
      if(BossGroup[i].isTouching(bulletGroup)){
       bulletGroup.destroyEach()
        BossGroup[i].destroy()
        score=score+50
      }
    }
  }

  if(BossGroup.isTouching(shooter)){
    for(var i=0;i<BossGroup.length;i++){
      if(BossGroup[i].isTouching(shooter)){
         BossGroup[i].destroy()
         life=life-3
      }
    }
  }
  SpawnBoss()
  
 }
 
  drawSprites()

  if(gameState=="lost"){
    textSize(50)
    fill("red")
    text("YOU DIED",400,400)
    lose.play()
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    bossGroup.destroyEach()
    shooter.destroy()

  }

  if(gameState=="won"){
    textSize(100)
    fill("red")
    text("CONGRATULATIONS YOU WON!",300,300)
    zombieGroup.destroyEach()
    ghostGroup.destroyEach()
    bulletGroup.destroyEach()
    shooter.destroy()
    BossGroup.destroyEach()
    win.play()
  }

  fill("red")
    textSize(30)
    text("lives:"+life,displayWidth-350,displayHeight/2-490)

    text("score:"+score,displayWidth-520,displayHeight/2-490)

}

function spawnZombies(){
  if(frameCount%50==0){
    zombie = createSprite(random(1900,1900),random(430,790),40,40)
    zombie.addImage(zombieImg)
    zombie.velocityX=-8
    zombie.lifetime=300
    zombieGroup.add(zombie)
    zombie.setCollider("rectangle",0,0,100,150)
  }
}

function SpawnBoss(){
  if(frameCount%50==0){
    Boss= createSprite(random(1900,1900),random(430,790),40,40)
    Boss.addImage(BossImg)
    Boss.velocityX=-8
    Boss.lifetime=300
    BossGroup.add(Boss)
    Boss.setCollider("rectangle",0,0,100,150)
  }
}



function spawnGhost(){
  if(frameCount%50==0){
    ghost = createSprite(random(1900,1900),random(600,790),40,40)
    ghost.addImage(ghostImg)
    ghost.velocityX=-8
    ghost.lifetime=300
    ghostGroup.add(ghost)
    ghost.scale=0.6
    ghost.setCollider("rectangle",0,0,200,250)
  }
}
 
    

function shootBullet(){
  bullet= createSprite(525, width/2, 50,20)
  bullet.y= shooter.y-7
  bullet.x=shooter.x+100
  bullet.addImage(bulletImg)
  bullet.velocityX=20
  bullet.scale=0.4
  bulletGroup.add(bullet)
}

