var miranhaImg, miranha;
var bgImg, bg;
var fausto, faustoImg1, faustoImg2, faustoImg3;
var teia;
var faustoG, teiaG;
var lucas = 0;
var manu = 0;
var time = 0;
var score = 0;
var gamestate = "PLAY";

function preload(){
 miranhaImg = loadAnimation("miranha1.png", "miranha2.png", "miranha3.png");
 faustoImg1 = loadImage("fausto1.png");
 faustoImg2 = loadImage("fausto2.png");
 faustoImg3 = loadImage("fausto3.png");
 bgImg = loadImage("bg.jpg")

}

function setup() {
 createCanvas(1200,600);

 teiaG = createGroup();
 faustoG = createGroup();

 bg = createSprite(windowWidth/2, windowHeight/2);
 bg.addImage("background", bgImg);
 bg.velocityX = -5;

 miranha = createSprite(150,470,20,20)
 miranha.addAnimation("miranha_correndo", miranhaImg);
 miranha.debug = false;
 miranha.setCollider("rectangle", 0, 20, 80, 100, 0);
}

function draw() {
  background("black");
   lucas += 1;
   manu += 1;
   if(gamestate == "PLAY"){
    time += 1; 
  }  
   //console.log(lucas);
  drawSprites();
 //movimento
 if(miranha.y > 470){
     miranha.y = 470;
   }
 if(miranha.y < 200){
     miranha.velocityY = 10;
   }
 if(keyDown("up") && manu > 70){
     miranha.velocityY = -20
     manu = 0;
   }
 //teia
   if(keyDown("space") && lucas > 150){
     Teia();
     lucas = 0;
   }
 //fausto
   if(frameCount % 150 === 0 && gamestate == "PLAY"){
    Fausto();
   }
 if(bg.x < 420){
     bg.x = width/1.5;
  }
  
   //colisão
   if(teiaG.collide(faustoG)){
    faustoG.destroyEach();
    teiaG.destroyEach();
    score += 1
  }
   if(faustoG.collide(miranha)){
    miranha.destroy();
    gamestate = "END";
   }
 
 fill("black");
 textSize(35);
 text(Math.round(time / 5), 50, 100);
 text(score, 200, 100);
 if(gamestate == "END"){
   text("FIM DE JOGO", windowWidth/2, windowHeight/2);
  }

}

function Fausto(){
 var sla = Math.round(random(1,3));
 
 fausto = createSprite(1300, 470);
 fausto.velocityX = fausto.velocityX -10;
 console.log(fausto.velocityX)
 faustoG.add(fausto);

 if(sla == 1){
     fausto.addImage(faustoImg1);
     fausto.scale = 0.4;
    }
 else if(sla == 2){
     fausto.addImage(faustoImg2);
     fausto.scale = 0.16;
    }
 else if(sla == 3){
     fausto.addImage(faustoImg3);
     fausto.scale = 0.24;
    }

 fausto.lifetime = 200
 //console.log(sla);
}

function Teia(){
 teia = createSprite(miranha.x, miranha.y, 50, 20);
 teia.velocityX = 50;
 teia.lifetime = 100;
 teiaG.add(teia);
}
