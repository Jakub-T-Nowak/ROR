import Pac from "./Circle.js";

/*==============================================
Class Game:
    1. Animation
    2. New Position (Easy)
    3. New Position  (Hard)
    4. Random Direction
    5. New Direction (follow the Circle)
==============================================*/

export default class Triangle extends Pac {
    eyeX;
    eyeY;
    makeItLessBoring = 0;
    spin = 1;
    colors = ['blue', 'BlueViolet', 'Chartreuse', 'Crimson', 'Cyan', 'DarkOrange', 'Red', 'Yellow']
    colorNumber = 0;

    /* ======== 1. Animation ======== */
    animation () {
        var ctx = Pac.myGameArea;

        if (this.spin === 1) {
            this.colorNumber = Math.floor(Math.random() * 8);
        }

        ctx.strokeStyle = this.colors[this.colorNumber];
        ctx.lineWidth = 3;

        ctx.rotate((Math.PI/180) * this.spin + (Math.PI/180) * 20);
        ctx.beginPath();
        ctx.moveTo(-14,8);
        ctx.lineTo(0,-16);
        ctx.lineTo(14,8);
        ctx.lineTo(-14,8);
        ctx.stroke();  
        ctx.rotate(-((Math.PI/180) * this.spin + (Math.PI/180) * 20));

        ctx.rotate(-((Math.PI/180) * this.spin - (Math.PI/180) * 10));
        ctx.beginPath();
        ctx.moveTo(-14,8);
        ctx.lineTo(0,-16);
        ctx.lineTo(14,8);
        ctx.lineTo(-14,8);
        ctx.stroke();  
        ctx.rotate((Math.PI/180) * this.spin - (Math.PI/180) * 10);

        this.spin= this.spin + 4;

        if (this.spin === 357) {
            this.spin = 1;
        }
    }

    /* ======== 2. New Position (Easy) ======== */
    newPosB (PacX, PacY) {
        if ((this.x === 20 || this.x === 180 || this.x === 340 || this.x === 500) && 
        (this.y === 20 || this.y === 180 || this.y === 340 || this.y === 500)) {
            
            var random1to10 = Math.floor(Math.random() * (-10) ) + 11;
            if (random1to10 < 7) {
                this._newDirection (PacX, PacY);
                if (random1to10 < 4) {
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
            this._newDirection (PacX, PacY);
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
        if (PacY < this.y) this.speedY = -2;
        if (PacY > this.y) this.speedY = 2;
        if (PacX < this.x) this.speedX = -2;
        if (PacX > this.x) this.speedX = 2;
    }   
}