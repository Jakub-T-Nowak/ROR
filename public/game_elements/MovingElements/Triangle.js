import Circle from "./Circle.js";
import TriangleDrawning from "./TriangleDrawning.js";

/*==============================================
Class Game:
    1. Animation
    2. New Position (Easy)
    3. New Position  (Hard)
    4. Random Direction
    5. New Direction (follow the Circle)
==============================================*/

export default class Triangle extends Circle {
    static number = 0
    triangleNumber;
    makeItLessBoring = 0;

    constructor(x, y, rect) {
        super(x, y, rect);
        this.drawning = new TriangleDrawning(x, y);
        this.triangleNumber = Triangle.number
        Triangle.number++
    }

    restartPosition () {
        if (this.triangleNumber === 0) {
            this.x = 500;
            this.y = 500;
        }
        else  if (this.triangleNumber === 1) {
            this.x = 20;
            this.y = 500;
        }
        else {
            this.x = 500;
            this.y = 180;
        }
    }

    newPos (_, {x, y, sX, sY}, points) {
        if (this.triangleNumber === 0) {
            this.newPosB(x, y) 
        }
        else {
            if (points < 110){
                this.newPosR(x, y, sX, sY);
            } else {
                this.newPosB(x, y);
            }    
        }
    }


    superMode() {
        this.turbo = 0;
        setTimeout(()=>{this.turbo = 1},2000)
    }


    /* ======== 2. New Position (Easy) ======== */
    newPosB (PacX, PacY) {
        if ((this.x === 20 || this.x === 180 || this.x === 340 || this.x === 500) && 
        (this.y === 20 || this.y === 180 || this.y === 340 || this.y === 500)) {
            
            var random1to10 = Math.floor(Math.random() * (-10) ) + 11;
            if (random1to10 < 7) {
                this._newDirection (PacX, PacY);
                if (random1to10 < 3) {
                    this.speedX = this.speedX*2;
                    this.speedY = this.speedY*2;
                }
            }
            else {
                this._randomDirection();
            }
        }
        
        this._collisionControl();
    }

    /* ======== 3. New Position  (Hard) ======== */
    newPosR (PacX, PacY, pacSx, pacSy) {
        if ((this.x === 20 || this.x === 180 || this.x === 340 || this.x === 500) && 
        (this.y === 20 || this.y === 180 || this.y === 340 || this.y === 500)) {

            var dPy = Math.abs(PacY - this.y);
            var dPx = Math.abs(PacX - this.x);

            if (dPy > 90 && dPx > 90){    
                if (pacSx ==  2) PacX += 80;
                if (pacSx == -2) PacX -= 80;
                if (pacSy ==  2) PacY += 80;
                if (pacSy == -2) PacY -= 80;
            }

            if (this.makeItLessBoring === 1 || this.makeItLessBoring === 3 || this.makeItLessBoring === 4 ||
                this.makeItLessBoring === 5 || this.makeItLessBoring === 6){
                    if (PacY < this.y) this.speedY = -2;
                    if (PacY > this.y) this.speedY = 2;
                }
                else {
                    if (PacX < this.x) this.speedX = -2;
                    if (PacX > this.x) this.speedX = 2;
                }

            this.makeItLessBoring ++;
            if (this.makeItLessBoring > 7) this._randomDirection();
            if (this.makeItLessBoring === 10) this.makeItLessBoring = 0;
        }

        this._collisionControl();
    }

    /* ======== 4. Random Direction ======== */
    _randomDirection () {
        var random1to4 = Math.floor(Math.random() * (-4) ) + 5;
        switch (random1to4){
            case 1:
                this.speedX = -2;
                break;
            case 2:
                this.speedY = -2;
                break;
            case 3:
                this.speedX = 2;
                break;
            case 4:
                this.speedY = 2;   
                break;
        }
    }

    /* ======== 5. New Direction (follow the Circle) ======== */
    _newDirection (PacX, PacY) {
        if (PacY < this.y) this.speedY = -2 * this.turbo;
        if (PacY > this.y) this.speedY = 2 * this.turbo;
        if (PacX < this.x) this.speedX = -2 * this.turbo;
        if (PacX > this.x) this.speedX = 2 * this.turbo;
    }   
}