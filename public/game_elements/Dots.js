import ObjectC from "./ObjectC.js";
import Dot from "./Dot.js";

export default class Dots extends ObjectC {
    dots = [];
    roads = [20, 180, 340, 500];
    dotsNumber;
    points;

    constructor() {
        super();
        this.initiate();
    }

    initiate() {
        this.points = 0;
        this.dots = [];
        for (var X = 20; X <= 500; X += 20) {
            this.roads.forEach((road) =>
                this.dots.push(new Dot(X, road, true, 0)),
            );
            if (!(X === 20 || X === 180 || X === 340 || X === 500)) {
                this.roads.forEach((road) =>
                    this.dots.push(new Dot(road, X, true, 0)),
                );
            }
        }
        this.dotsNumber = this.dots.length;

        var random30to110 = Math.floor(Math.random() * -30) + 111;
        this.dots[random30to110].super = 1;
        var random30to110 = Math.floor(Math.random() * -30) + 111;
        this.dots[random30to110].super = 2;
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
            dot.drawDot(Dots.myGameArea);
        });

        return superDotEaten;
    }
}
