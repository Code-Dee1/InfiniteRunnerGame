var towerImg, tower;
var ghost, ghostImg;
var princess, princessImg;
var doorImg, door, doorsGroup;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleBlocksGroup;
var gamestate = "play"


function preload(){
  towerImg = loadImage("tower.png");
  princessImg = loadImage("download.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
}


function setup(){
 createCanvas(700,700);

 tower = createSprite(250,250);
 tower.addImage("tower", towerImg);
 tower.velocityY = 1;

 princess = createSprite(250,250,20,20);
 princess.addImage("princess",princessImg);
 princess.scale = 0.3;

 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlocksGroup = new Group();

}



function draw(){
  background(0);
  if (gamestate === "play"){
    if (keyDown("space")){
      princess.velocityY = -14
     }
  
  if(keyDown("right_arrow")){
       princess.x = princess.x + 4
     }

  if(keyDown("left_arrow")){
       princess.x = princess.x - 4
     }

     
  princess.velocityY = princess.velocityY + 0.7;

     if(tower.y > 500){
      tower.y = 400
     }
     SpawnDoors();



    if(climbersGroup.isTouching(princess)){
       princess.velocityY = 0
     }
   
     if(invisibleBlocksGroup.isTouching(princess) || princess.y > 700){
       princess.destroy()
       gamestate = "end"
      
     }
    
   drawSprites();
  
  }

  if(gamestate === "end"){
    stroke("yellow")
    fill("yellow")
    textSize(45);
    text("Game Over", 230,250);
  }
}




function SpawnDoors(){
if(frameCount % 240 === 0){
  var door = createSprite(220, - 55);
  var climber = createSprite(200,20);
  var invisibleBlock = createSprite(200,20);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 3;

  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleBlock.x = door.x;

  door.addImage(doorImg);
  climber.addImage(climberImg);

  door.velocityY = 2;
  climber.velocityY = 2;
  invisibleBlock.velocityY = 2;

  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlocksGroup.add(invisibleBlock);
invisibleBlock.debug = true;
  princess.depth = door.depth;
  princess.depth+1


}
}