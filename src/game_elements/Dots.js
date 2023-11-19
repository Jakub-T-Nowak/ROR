//0,0_________ X
//  |         5,0
//  |
//  |
//  |0,5      5,5
//  Y

import Dot from "./Dot.js";
import { dotsCoordinates } from "./Coordinates.js"

export default class Dots {
    dots = [];
    dotsNumber;
    points;

    constructor() {
        this.#createDots();
    }

    #createDots() {
        this.points = 0;
        const coordinates = dotsCoordinates();
        this.dots = [];
        
        coordinates.forEach((c)=>{this.dots.push(new Dot(c))})

        this.dotsNumber = this.dots.length;

        this.dots[this.randomNumber()].setSuper(1);
        this.dots[this.randomNumber()].setSuper(2);
    }

    randomNumber() {
        // Random integer from 2 to dots.length
        return Math.floor(Math.random() * this.dots.length) + 2;
    }

    getPoints() {
        return this.points;
    }

    makeNewDots() {
        this.dotsNumber = this.dots.length;
        this.dots.forEach((dot) => dot.makeVisible());
    }

    drawDots({ x: pacX, y: pacY }) {
        let superDotEaten = false;

        if (this.dotsNumber === 0) this.makeNewDots();

        this.dots.forEach((dot) => {
            if (dot.checkForContact(pacX, pacY)) {
                superDotEaten = dot.super;
                this.dotsNumber--;
                this.points += superDotEaten ? 10 : 1;
            }
            dot.drawDot();
        });

        return superDotEaten;
    }
}
