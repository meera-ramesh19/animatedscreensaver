//sset up canvas
//gives access to drawing properties
const canvas=document.querySelector('canvas')
const ctx=canvas.getContext('2d');

//innderWidth refers to the viewport
const width=canvas.width=width.innerWidth;
const height=canvas.height=height.innerheight;

//function to generate random number

function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;

}

//function to generate a random RGB color
function randomRGB(){
    return `rgb(${random(0,255)}, ${random(0,255)} , ${random(0,255)})`
}

class Ball{
    constructor(x,y,veloX,veloY,color,size){
        this.x=x;
        this.y=y;
        this.veloX=veloX;
        this.veloY=veloY;
        this.color=color;
        this.size=size;
    }

draw(){
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
    ctx.fill()
  }

  update(){
    if((this.x + this.size >= width)){
        this.veloX=-(this.veloX)
    }
    if((this.x - this.size <= 0)){
        this.veloX=-(this.veloX)
    }
    if((this.y + this.size >= height)){
        this.veloY=-(this.veloY)
    }
    if((this.y - this.size <= 0)){
        this.veloY=-(this.veloY)
    }
      
    this.x+=this.veloX;
    this.y+=this.veloY;
  }
   
  collisionDetect(){
    for(const ball of balls){
        if(!(this===ball)){
            const dx=this.x-ball.x;
            const dy=this.y-ball.y;
           const distance=Math.sqrt(dx*dx+dy*dy);

           if(distance < this.size+ball.size){
            ball.color=this.ball*randomRGB()
            ball.veloX+=0.01
           }
        }
    }
   }
}
  const balls=[]

  while(balls.length < 50){
    const size=random(10,20)
    const ball = new Ball(random(0+size, width-size),//x-coordinate
                         random(0+size, height-size),//y-coordinate
                         random(1,4),//veloX
                         random(1,4),//veloY
                         randomRGB(),//color
                         size
                  )   

    balls.push(ball)
  }

  function loop(){
    ctx.fillStyle='rgba(0,0,0,0.01)';
    ctx.fillRect(0,0,width,height);

    for (const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    requestAnimationFrame(loop)
  }

  loop();

