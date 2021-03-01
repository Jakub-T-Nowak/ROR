import CircleDrawning from "./CircleDrawning.js";
import TriangleDrawning from "./TriangleDrawning.js";
/*============================
Class Circle:
    Update
    New Position
    Collision Control
============================*/

export default class Circle{
    x;
    y;
    gameBackground;
    rect;
    turbo = 1;
    speedX = 0;
    speedY = 0;
    b = 0;

    /* ======== 1. Constructor ======== */ 
    constructor (x, y, gameBackground, rect) {
        this.x = x;
        this.y = y;
        this.gameBackground = gameBackground;
        this.rect = rect;
        if (y === 20) {
            this.drawning = new CircleDrawning(x, y);
        } else {
            this.drawning = new TriangleDrawning(x, y);
        }
    }

    getX () {
        return this.x
    }
    getY () {
        return this.y
    }
    getXY () {
        return {x: this.x, y: this.y}
    }

    getParams () {
        return {x: this.x, y: this.y, sX: this.speedX, sY: this.speedY}
    }

    superMode() {
        this.turbo = 2;

        setTimeout(
            ()=>{
                this.turbo =1
            },5000)

    }
    
    /* ======== 3. Update - where to draw ======== */ 
    update () {
        this.drawning.update(this.x, this.y, this.speedX, this.speedY);
    }

    /* ======== 4. New Position ======== */
    newPos (clickedKey) {
        this.b = clickedKey;
        this._encodingSpeed();
        this._collisionControl();
    }

    restartPosition () {
        this.b = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.x = 20;
        this.y = 20;
    }


    //descripting speed from button value
    _encodingSpeed() {
        if (this.b == 1) {
            this.speedX = -2;
        } else if (this.b == 2) {
            this.speedY = -2;
        } else if (this.b == 3) {
            this.speedX = 2;
        } else if (this.b == 4) {
            this.speedY = 2;   
        }
    }

    /* ======== 5. Collision Control ======== */
    _collisionControl () {
        //border
        if (this.x == this.gameBackground.x + 20 && this.speedX <= 0){
            this.speedX = 0;
        }
        if (this.x == this.gameBackground.x + this.gameBackground.width - 20 && this.speedX >= 0){
            this.speedX = 0;
        }
        if (this.y == this.gameBackground.y + 20 && this.speedY <= 0){
            this.speedY = 0;
        }
        if (this.y == this.gameBackground.y + this.gameBackground.height - 20 && this.speedY >= 0){
            this.speedY = 0;
        }
        //rectangles:
        for (let k = 0; k < this.rect.length; k++) {
            if (this.x == this.rect[k].x - 20 && (this.y > this.rect[k].y - 20 && this.y < this.rect[k].y + this.rect[k].height + 20) && this.speedX >= 0){
                this.speedX = 0;
            }
            if (this.x == this.rect[k].x + this.rect[k].width + 20 && (this.y > this.rect[k].y - 20 && this.y < this.rect[k].y + this.rect[k].height + 20) && this.speedX <= 0){
                this.speedX = 0;
            }
            if (this.y == this.rect[k].y - 20 && (this.x > this.rect[k].x - 20 && this.x < this.rect[k].x + this.rect[k].width + 20) && this.speedY >= 0){
                this.speedY = 0;
            }
            if (this.y == this.rect[k].y + this.rect[k].height + 20 && (this.x > this.rect[k].x - 20 && this.x < this.rect[k].x + this.rect[k].width + 20) && this.speedY <= 0){
                this.speedY = 0;
            }
        }

        //rules of changing direction on intersection
        if (0 < this.speedY && this.speedXm1 !== 0) {            
            this.speedX = 0;
            this.speedY = 2;
        }
        if (0 > this.speedY && this.speedXm1 !== 0) {            
            this.speedX = 0;
            this.speedY = -2;
        }
        if (this.speedX !== 0 && this.speedY !== 0) {            
            this.speedY = 0;
        }
        this.speedXm1 = this.speedX;

        this.x += this.speedX * this.turbo;
        this.y += this.speedY * this.turbo;
    }
}