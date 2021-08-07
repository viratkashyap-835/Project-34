//Create variables here
var dog,dogImg,doghappyImg;
var database;
var foodstock,foods;
var x;
function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  doghappyImg=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,250,50,100);
  dog.addImage(dogImg);

  dog.scale=0.15;
  foodstock=database.ref("Food");
  foodstock.on("value",readStock);

}


function draw() {  
background(46,139,87);
  drawSprites();
  //add styles here
if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(doghappyImg);
}
fill(255,255,254);
stroke("black");
textSize(20);
text("Food remaining:"+foods,170,150);
textSize(15);
text("Press up arrow key to feed your dog.",130,10,300,20);
}

function readStock(data){
  foods=data.val();
    
}

function writeStock(x){
  if(x<=0){
    x=0; 
  }
  else{
    x-=1;
  }
  database.ref("/").update({
    Food:x
  });
}



