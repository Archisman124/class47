var ground,groundImage
var mario,marioImage
var obstacle,obstacleImage
var brick,brickImage
var brickGroup,obstacleGroup
var score=0
var gameState="Play"
function preload(){
groundImage=loadImage("ground2.png")
marioImage=loadAnimation('mario00.png','mario01.png','mario02.png','mario03.png')
obstacleImage=loadAnimation('obstacle1.png','obstacle2.png','obstacle3.png','obstacle4.png')
brickImage=loadImage('brick.png')
}
function setup(){
createCanvas(360,400) 
ground=createSprite(300,400)
ground.addImage(groundImage)
ground.velocityX=-4
mario=createSprite(50,335)
mario.addAnimation("mario",marioImage)
mario.scale=1.5
obstacleGroup=new Group()
brickGroup=new Group()

}
function draw(){
  background('blue')
  if(gameState==="Play"){
    if(ground.x<0){
      ground.x=ground.width/2
      
    }
    if(keyDown('up')&&mario.y>331){
      mario.velocityY=-10
    }
    mario.velocityY=mario.velocityY+0.5
   
   spawnObstacles()
    SpawnBricks()
    if(mario.isTouching(brickGroup)){
      brickGroup.destroyEach()
      score=score+10
      }
      if(mario.isTouching(obstacleGroup)){
        console.log("Hi")
        gameState="End"
      }
  }
  else if(gameState==="End"){
brickGroup.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0)
ground.velocityX=0
brickGroup.setLifetimeEach(-1)
obstacleGroup.setLifetimeEach(-1)
  }

  

  
  mario.collide(ground)  
  
  drawSprites()     
textSize(25)
fill("black")
text("Score: "+score,200,50)
}
function spawnObstacles(){
  if(frameCount%60===0){
    obstacle=createSprite(360,340,10,10)
    obstacle.addAnimation("obstacle",obstacleImage)
    obstacle.velocityX=-4
    obstacle.lifetime=90
    obstacleGroup.add(obstacle)
  }

}
function SpawnBricks(){
  if(frameCount%60===0){
    brick=createSprite(360,Math.round(random(150,250)),10,10)
    brick.addImage(brickImage)
    brick.velocityX=-3
    brick.lifetime=120
    brickGroup.add(brick)
  }
}