var myGamePiece;
var screenWidth=window.innerWidth;
var screenHeight=window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
var Universal_G=6.6742
var AU   =110; // astronomical unit,1 au =149 597 871 km

var shipAngle   =0; 

var gameOver=false;
var newGame=false;
var backToEarth=false;
var hitPlanet=false;
var distToearth=0;
var outOfGas=true;
var guide=true;
var hitedPlantName;
// astronomical unit,1 au =149 597 871 km
// time for animation
var  sun_t= 5,
    mercury_t= 7,
    venus_t= 8,
    earth_t= 9,
    mars_t= 10,
    jupiter_t= 15,
    saturn_t= 16,
    uranus_t= 17,
    neptune_t= 18,
    pluto_t=19,
    moon_t= 0.1,
// elapsed time interval for animation
    sun_delta_t = .05,
    mercury_delta_t = .04,
    venus_delta_t = .03,
    earth_delta_t = .02,
    mars_delta_t = .01,
    jupiter_delta_t = .008,
    saturn_delta_t = .007,
    uranus_delta_t = .005,
    neptune_delta_t = .004,
    pluto_delta_t =.005,
    moon_delta_t=0.05,

    sun_radius=6,           //the radius of sun
    sun_dist=0,             //the distance from the orgin

    mercury_radius=0.5,      //the radius of Mercury
    mercury_dist=0.3871*AU,         //the distance from the orgin


    venus_radius=1.5      //the radius of venus
    venus_dist=0.7233*AU           //the distance from the orgin

    earth_radius=1.5,        //the radius of earth
    earth_dist =AU,          //the distance from the origin


    mars_radius=0.75,         //the radius of mars
    mars_dist=1.5*AU,            //the distance from the orgin

    asteroid_belt_in= mars_dist+3,//asteroid_belt set
    asteroid_belt_out=asteroid_belt_in+5,



    jupiter_radius=3,    //the radius of jupiter
    jupiter_dist=2.2026*AU,         //the distance from the orgin

   
    saturn_radius=3 ,       //the radius of saturn
    saturn_dist=3.5549*AU,           //the distance from the orgin

    plante_ring_color=0xCD853F,
    plante_ring_in=0.3,
    plante_ring_out=1.5,

    uranus_radius=1.8,      //the radius of the  Uranus
    uranus_dist=4.2184*AU,               //the distance from the orgin

    neptune_radius=1.6,      //the radius of the neptune
    neptune_dist=5*AU,         //the distance from the orgin

    pluto_radius=1,        //the radius of the Pluto
    pluto_dist=8*AU,           //the distance from the orgin

    moon_radius =earth_radius/5,    // size of the moon
    moon_dist = earth_radius+1; // its distance from the planet surface
    moon_color=0xA9A9A9;

    moon1_radius=jupiter_radius/10,
    moon1_dist=jupiter_radius+1,
    moon1_delta_t=8,
    moon1_t=0.03,
    moon1_color=moon_color,

    moon2_radius=jupiter_radius/8,
    moon2_dist=moon1_dist+1.5,
    moon2_delta_t=9,
    moon2_t=0.05,
    moon2_color=moon_color,

    moon3_radius=jupiter_radius/5,
    moon3_dist=moon1_dist+1.5,
    moon3_delta_t=6,
    moon3_t=0.05,
    moon3_color=moon_color,

//plante color setting
    sun_color='#ffa500',
    sun_light_color='#ffffff',
    mercury_color='#8b4513',
    venus_color='#B8860B',
    earth_color='#00bfff',
    mars_color='#b22222',
    jupiter_color='#D2691E',
    saturn_color='#D2691f',
    uranus_color='#0000CD',
    neptune_color='#000080',
    pluto_color='#87CEFA';
var planets=[];
function startGame() {
    myGameArea.start();
     //Planet(radius,color, x, y,mass,time,dt,dist)
    planets.push(new Planet("sun",30, sun_color, screenWidth/2, screenHeight/2,300,sun_t,sun_delta_t,sun_dist));
    planets.push(new Planet("earth",10, earth_color, screenWidth/2+earth_dist, screenHeight/2,100,earth_t,earth_delta_t,earth_dist));
    planets.push(new Planet("mars",5, mars_color, screenWidth/2+mars_dist, screenHeight/2,50,mars_t,mars_delta_t,mars_dist));
    planets.push(new Planet("mercury",5, mercury_color, screenWidth/2+mercury_dist, screenHeight/2,50,mercury_t,mercury_delta_t,mercury_dist));
    planets.push(new Planet("venus",10, venus_color, screenWidth/2+venus_dist, screenHeight/2,100,venus_t,venus_delta_t,venus_dist));
    planets.push(new Planet("jupiter",20, jupiter_color, screenWidth/2+jupiter_dist, screenHeight/2,200,jupiter_t,jupiter_delta_t,jupiter_dist));
    planets.push(new Planet("saturn",20,saturn_color, screenWidth/2+saturn_dist, screenHeight/2,200,saturn_t,saturn_delta_t,saturn_dist));
    planets.push(new Planet("uranus",12, uranus_color, screenWidth/2+uranus_dist, screenHeight/2,120,uranus_t,uranus_delta_t,uranus_dist));
    planets.push(new Planet("neptune",12, neptune_color, screenWidth/2+neptune_dist, screenHeight/2,120,neptune_t,neptune_delta_t,neptune_dist));
//planets.push(new Planet("pluto",10, "green", screenWidth/2+pluto_dist, screenHeigth/2,100,pluto_t,pluto_delta_t,pluto_dist));

   // planets.moon = new Planet(5, "white", earth.x+45, earth.y,100,moon_t, moon_delta_t,moon_dist);

   myGamePiece = new component(1,10, 3, "red", 20, 20,0,0.5,100);
    // sun = new Planet("sun",40, "yellow", screenWidth/2, screenHeigth/2);
    // earth = new Planet("earth",20, "blue", sun.x+150, sun.y);
    // mars = new Planet(,20, "red", sun.x+350, sun.y);
    // moon = new Planet(,5, "white", earth.x+45, earth.y);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
        window.addEventListener('touchmove', function (e) {
            myGameArea.x = e.touches[0].screenX;
            myGameArea.y = e.touches[0].screenY;
        })
    }, 
    clear : function(){

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}

function component(mass,width, height, color, x, y,angle,speed,gas) {
    this.mass=mass;
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speed = speed; 
    this.angle=angle; 
    this.x = x;
    this.y = y;  
    this.gas = gas;  
    this.centerX=this.x+this.width/2;
    this.centerY=this.y+this.height/2; 
    this.update = function() 
    {
    this.centerX=this.x+this.width/2;
    this.centerY=this.y+this.height/2; 

   
       this.gas-=Math.abs(this.speed)*0.08;
 
   
        ctx = myGameArea.context;
        if(this.speed>0.6)
        {
          guide=0
        }
        if(guide)
         {
            ctx.beginPath();
          ctx.arc(this.centerX, this.centerY, this.width*2, 0, Math.PI*2, false);
          ctx.font = "15px Arial";
        ctx.fillStyle = "white";
         ctx.fillText("you are here",this.centerX+this.width*2,this.centerY);
          ctx.strokeStyle="#ffffff";
          ctx.stroke();
          ctx.closePath();
          ctx.font = "40px Arial";
            ctx.fillStyle = "white";
          ctx.fillText("use w,a,s,d to control ",10,600);
          ctx.fillText("try move back to earth before out of gas ",10,640);
           ctx.fillText("don't hit anything ",10,680);
        ctx.arc(planets[1].x, planets[1].y, planets[1].radius*1.5, 0, Math.PI*2, false);
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
         ctx.fillText("earth is here",planets[1].x+planets[1].radius*1.5, planets[1].y,);


         }

        ctx.font = "25px Arial";
        ctx.fillStyle = "red";
         ctx.fillText("speed:",10,50);
        ctx.fillText(Math.round(this.speed * 100) ,90,50);
         ctx.fillStyle = "white";
         ctx.fillText("gas   :",10,90);

        
         
        ctx.fillText(Math.round(this.gas * 100) / 100,80,90);
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        ctx.fillStyle = "white";
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
         ctx.fillStyle = "red";
        ctx.fillRect(this.width / -2-10, this.height / -2, this.width/2+this.speed*2, this.height/3+this.speed);           
        ctx.fillRect(this.width / -2-10, this.height / -2+3, this.width/2+this.speed*2, this.height/3+this.speed);           
        
        ctx.restore();    
 //        ctx.save();
 //        ctx.fillStyle = color;
 // // move the rotation point to the center of the rect
 //        ctx.translate( this.x+this.width/2, this.y+this.height/2);

 //        // rotate the rect
 //        ctx.rotate(this.angle*Math.PI/180);
 //        ctx.fillRect(this.x, this.y, this.width, this.height);
 //        ctx.translate(-(this.x+this.width/2),-(this.y+this.height/2));
 //        ctx.restore();
        //ctx.rotate(20*Math.PI/180);
    }
    this.newPos = function() {
        this.x += Math.cos(this.angle)*this.speed
        this.y += Math.sin(this.angle)*this.speed  

for(var i=0;i<planets.length;i++)
 {


        var c = findDist(this.centerX,this.centerY,planets[i].x,planets[i].y)
        var force=Universal_G*(this.mass*planets[i].mass/(c*c))
        var findedAngle = findAngle(this.centerX, this.centerY,planets[i].x,planets[i].y);

        var xGforce=Math.cos(findedAngle)*force;
        var yGforce=Math.sin(findedAngle)*force;

        ctx = myGameArea.context;
        ctx.font = "10px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(planets[i].name,screenWidth-screenWidth/10,20*i+10);
        ctx.fillText(Math.round(c * 100) / 100,screenWidth-screenWidth/15,20*i+10);
       distToearth=findDist(this.centerX,this.centerY,planets[1].x,planets[1].y);

      if(this.gas<=0)
        {
           //alert("game over, you run out of gas "+findDist(this.centerX,this.centerY,planets[2].x,planets[2].y));
      gameOver=true;
       outOfGas=true;
     //  distToearth=findDist(this.centerX,this.centerY,planets[1].x,planets[1].y);
        }
        if(c<=planets[i].radius)
        {
          if(i==1)
          {
          //alert("welcome back to earth"+findDist(this.centerX,this.centerY,planets[1].x,planets[1].y));
       gameOver=true;
       backToEarth=true;


          }
          else
          {
            //alert("game over, you hit "+planets[i].name+" you distance from earth"+findDist(this.centerX,this.centerY,planets[2].x,planets[2].y));
       gameOver=true;
       hitPlanet=true;
     hitedPlantName=planets[i].name;
          }
          //alert("game over,you distance from earth"+findDist(this.centerX,this.centerY,planets[2].x,planets[2].y));
        }
        console.log(planets[1].name)
        this.x += xGforce;
        this.y +=yGforce;  

 }


        // var c = findDist(this.centerX,this.centerY,screenWidth /2,screenHeight /2)
        // var force=Universal_G*(this.mass*100/(c*c))
        // var dist = findAngle(this.centerX, this.centerY,screenWidth /2, screenHeight /2);

        // var xGforce=Math.cos(dist)*force;
        // var yGforce=Math.sin(dist)*force;



      
    }    
}

function findDist(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var dist = Math.sqrt( dy*dy + dx*dx );
  //theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return dist;
}


function findAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}


function Planet(name,radius,color, x, y,mass,time,dt,dist) {
    this.gamearea = myGameArea;
    this.radius = radius;
    this.name = name;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y; 
    this.mass = mass; 
    this.time=time;  
    this.dt=dt;
    this.dist=dist;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}




function gameOver(text)
{
   ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
}

function updateGameArea() {



if(gameOver)
{
   for(var i=0;i<planets.length;i++)
 {
  planets[i].time+=planets[i].dt;
   //console.log(planets[i].time);
  planets[i].x=screenWidth/2+Math.cos(planets[i].time)*planets[i].dist;
  planets[i].y=screenHeight/2+Math.sin(planets[i].time)*planets[i].dist;
  planets[i].newPos();
  planets[i].update();

 }


    ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(0, 0, 500, 0, Math.PI*2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();


        ctx.font = "15px Arial";
        ctx.fillStyle = "red";
         
          if(hitPlanet)
          {
            ctx.fillText("gameover",10,50);
            ctx.fillText("distance to earth "+distToearth,10,70);
            ctx.fillText("you hit  planet",10,90);

             ctx.font = "45px Arial";
            ctx.fillStyle = "green";
            ctx.fillText(hitedPlantName,10,200);
          }
          
          else if(backToEarth)
          {
            ctx.fillText("welcome back to",10,50)

            ctx.fillText("Earth ",10,70)
          }
          else if(outOfGas)
          {
            ctx.fillText("gameover",10,50)
            ctx.fillText("distance to earth "+distToearth,10,70);
            ctx.fillText("you out of gas ",10,90)
          }
        

    // myGamePiece.newPos();    
    // myGamePiece.update();

}
else
{
  myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
if (myGameArea.touchX && myGameArea.touchY) 
    {
        if(myGameArea.x>=screenWidth/2)
        {
          myGamePiece.angle-=0.5 * Math.PI / 180
        }else{
           myGamePiece.angle+=0.5 * Math.PI / 180
        } 
        myGameArea.x;
        myGamePiece.y = myGameArea.y; 
    }
    if (myGameArea.keys && myGameArea.keys[65]) { myGamePiece.angle-=0.5 * Math.PI / 180}//a
    if (myGameArea.keys && myGameArea.keys[68]) { myGamePiece.angle+= 0.5 * Math.PI / 180 }//d
    if (myGameArea.keys && myGameArea.keys[87]&&myGamePiece.speed<2) { myGamePiece.speed +=0.01; }//w
    if (myGameArea.keys && myGameArea.keys[83]&&myGamePiece.speed>-2) { myGamePiece.speed -=0.01;  }//s
// Earth
  var time = new Date();

    ctx = myGameArea.context;
        //ctx.beginPath();
        //ctx.arc(0, 0, 500, 0, Math.PI*2, false);
        ctx.fillStyle = "white";
      

        ctx.font = "15px Arial";
       
//   console.log(time);
 for(var i=0;i<planets.length;i++)
 {
  planets[i].time+=planets[i].dt;
   //console.log(planets[i].time);
  planets[i].x=screenWidth/2+Math.cos(planets[i].time)*planets[i].dist;
  planets[i].y=screenHeight/2+Math.sin(planets[i].time)*planets[i].dist;
  planets[i].newPos();
  planets[i].update();
 }
    myGamePiece.newPos();    
    myGamePiece.update();




}


    







 // mars.newPos();    
 //    mars.update();
 //   sun.newPos();    
 //    sun.update();
 //     earth.newPos();    
 //    earth.update();
 //  moon.newPos();    
 //    moon.update();
}