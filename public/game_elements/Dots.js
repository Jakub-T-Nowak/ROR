import ObjectC from "./ObjectC.js";

export default class Dots  extends ObjectC {
    dots = [];
    roads = [20, 180, 340, 500];
    dotsNumber;
    points;

    constructor () {
        super();
        this.initiate();
    }

    initiate () {
        this.points = 0;     
        this.dots = [];
        for (var X = 20; X <= 500; X += 20){
            this.roads.forEach(road => this.dots.push([X, road, true, 0]))
            if (!(X === 20 || X === 180 || X === 340 || X === 500)) {
                this.roads.forEach(road => this.dots.push([road, X, true, 0]))
            }
        }
        this.dotsNumber = this.dots.length;

        var random30to110 = Math.floor(Math.random() * (-30) ) + 111;
        this.dots[random30to110][3] = 1;
        var random30to110 = Math.floor(Math.random() * (-30) ) + 111;
        this.dots[random30to110][3] = 2;
    }

    getPoints () {
        return this.points;
    }

    drawDots ({x:pacX, y:pacY}) {
        let superDotEaten = false

        //making new dots when all are gone
        if (this.dotsNumber === 0) {
            this.dotsNumber = this.dots.length;
            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i][2] = true;
            }
        }

        //checking if the Circle is getting dot
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i][0] === pacX && this.dots[i][1] === pacY && this.dots[i][2] === true){
                superDotEaten = this.dots[i][3]
                this.dots[i][2] = false;
                this.dotsNumber--;
                this.points += superDotEaten === true ? 10 : 1
            }
        }

        //drawing dots
        for (const dot of this.dots) {
            if (dot[2] === true) {
                
                let size;
                if (dot[3] === 0) size = 2
                if (dot[3] === 1) size = 6
                if (dot[3] === 2) size = 7
                var ctx = Dots.myGameArea;

                if (dot[3] === 0 || dot[3] === 1) ctx.fillStyle = "white";    
                if (dot[3] === 2) ctx.fillStyle = "red";  
                
                ctx.beginPath();
                ctx.arc(dot[0],dot[1], size, 0, 2* Math.PI);
                ctx.fill();
            }
        }

        return superDotEaten;
    }
}