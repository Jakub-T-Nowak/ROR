import CircleDrawning from "./CircleDrawning.js";

/*============================
Class Circle:
    Update
    New Position
    Collision Control
============================*/

export default class Circle{
    x;
    y;
    board;
    turbo = 1;
    speedX = 0;
    speedY = 0;
    b = 0;

    /* ======== 1. Constructor ======== */ 
    constructor (x, y, rect) {
        this.x = x;
        this.y = y;
        this.board = rect;
        this.gameBackground = rect.getBoard()[0];
        this.drawning = new CircleDrawning(x, y);
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
        setTimeout(()=>{this.turbo =1},5000)
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
        this.speedX = this.board.r1(this.x, this.y, this.speedX) ? 0 : this.speedX;
        this.speedY = this.board.r1(this.y, this.x, this.speedY) ? 0 : this.speedY;

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