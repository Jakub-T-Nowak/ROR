import ObjectC from "./ObjectC.js";

export default class CircleDrawning extends ObjectC {
    x;
    y;
    speedX = 0;
    speedY = 0;
    b = 0;
    ctx = CircleDrawning.myGameArea
    i = 100;
    flag = 0;

    /* ======== 1. Constructor ======== */ 
    constructor (x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    //depending on direction of the Circle center of the Circle is changing its position
    _circleCenterPosition () {
        const position = {x: 0, y: 0}

        if (this.speedY == 0 && this.speedX == 0) {
            position.x = 0;
            position.y = 0;
        } else if (this.speedY<0 && this.speedX == 0) {
            position.x = 0;
            position.y = -19;
        } else if (this.speedY>0 && this.speedX == 0) {
            position.x = 0;
            position.y = 19;
        } else if (this.speedY==0 && this.speedX>0) {
            position.x = 19;
            position.y = 0;
        } else if (this.speedY==0 && this.speedX<0) {
            position.x = -19;
            position.y = 0;
        }

        return position
    }

    //changing shades of gray
    _setGreyShade() {
        this.i += this.flag;
        this.i === 252 && (this.flag = -4);
        this.i === 100 && (this.flag = 4);
    }

    /* ======== 2. Animation- what to draw ======== */ 
    _animation () {
        const position = this._circleCenterPosition();
        this._setGreyShade();
        //create canvas gradient
        var gradient = this.ctx.createRadialGradient(position.x,position.y,0, 0,0,19);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.1, `rgb(${this.i},${this.i},${this.i})`);
        gradient.addColorStop(1, 'rgb(100, 100, 100)');
        this.ctx.fillStyle = gradient;
        //draw
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 19, 0, Math.PI*2);
        this.ctx.fill();        
    }
    
    /* ======== 3. Update - where to draw ======== */ 
    update (x,y, speedX,speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.ctx.translate(this.x,this.y);
        this._animation();
        this.ctx.translate(-this.x,-this.y);
    }
}