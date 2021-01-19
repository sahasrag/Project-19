var bananaImage, bananaGroup, obstacleImage, obstacleGroup, back, score, backIamge, monkey, monkeyImage, stone, invisibleGround;


function preload() {
  backImage = loadImage("jungle.jpg");
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png", "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200, 200, 400, 400);
  back.addImage("run",backImage);
  back.velocityX = -4; 
  
  monkey = createSprite(50,350, 10, 10);
  monkey.addAnimation("running", monkeyImage);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200, 380, 400, 10);
  invisibleGround.visible = false;
  
  bananaGroup  = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 100, 50);
  if (back.x < 0){
    back.x = back.width/2;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score = score+2;
    banana.destroy();
  }
  
  if(keyDown("space")){
  monkey.velocityY = -12; 
  }
  monkey.velocityY = monkey.velocityY + 1; 
  monkey.collide(invisibleGround);
  obstacleGroup.collide(invisibleGround);
  
  food();
  obstacles();
  drawSprites();
}

function food() {
  if(frameCount % 80 === 0){
    banana = createSprite(400,100, 20, 20);
    banana.addImage(bananaImage);

    banana.scale = 0.05;
    banana.y = random(120,200);
     
    banana.velocityX = -4;
    banana.lifetime = 100;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
} 

function obstacles() {
  if(frameCount % 300 === 0){
    var obstacle = createSprite(400, 340, 20, 20);
    obstacle.addImage(obstacleImage);

   obstacle.scale = 0.15;
   obstacle.velocityX = -3;
   obstacle.lifetime = 150;
   if(obstacleGroup.isTouching(monkey)){
      var rand = Math.round(random(1,4));
    switch(score){
      case 1:player.scale = 0.12;
      break;
      case 2:player.scale = 0.14;
      break;
      case 3:player.scale = 0.16;
      break;
      case 4:player.scale = 0.18;
      break;
      default:break
    }
    }
   obstacleGroup.add(obstacle);
  }
}