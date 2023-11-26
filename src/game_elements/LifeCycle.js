import Triangle from "./movingElements/Triangle.js";
import Board from "./board/Board.js";
import Circle from "./movingElements/Circle.js";
import Dots from "./Dots.js";
import gameOverPanel from "./GameOverPanel.js";
import lostLifePanel from "./LostLifePanel.js";
import drawPointsAndLives from "./DrawPointsAndLives.js";

const thirdTrianglePoints = 195;

export default class LifeCycle {
    circle; //type: Circle
    rect; //type: [] Rectangle
    triangles = []; //type: [] Triangle
    dotsAndPoints; //type: Dots
    movingElements; //type: [] Circle
    lives = 0;
    clickedKey = 0;
    gameInterval; //type: number, interval id

    gameNavigation = {
        ArrowLeft: () => {
            this.clickedKey = 1;
        },
        ArrowUp: () => {
            this.clickedKey = 2;
        },
        ArrowRight: () => {
            this.clickedKey = 3;
        },
        ArrowDown: () => {
            this.clickedKey = 4;
        },
    };

    constructor(k) {
        this.k = k;
        this.dotsAndPoints = new Dots();
        this.rect = new Board();
        this.circle = new Circle(20, 20);
        this.triangles.push(new Triangle(500, 500), new Triangle(20, 500));
        this.movingElements = [this.circle, ...this.triangles];
    }

    startGame() {
        this.k.rules = this.gameNavigation;
        this.gameInterval = setInterval(() => {
            this.updateGameArea();
        }, 20);
    }

    updateGameArea() {
        if (this.checkIfLifeIsLost()) {
            this.pause();
        } else {
            this.gameStep();
        }
    }

    checkIfLifeIsLost() {
        return this.triangles.some((triangle) => {
            const Dx = Math.abs(this.circle.getX() - triangle.getX());
            const Dy = Math.abs(this.circle.getY() - triangle.getY());
            return Dx < 20 && Dy < 20;
        });
    }

    gameStep() {
        this.rect.drawBoard();
        this.movingElements.forEach((element) =>
            element.newPos(
                this.clickedKey,
                this.circle.getParams(),
                this.dotsAndPoints.getPoints(),
            ),
        );
        const superDotEaten = this.dotsAndPoints.drawDots(this.circle.getXY());
        this.addThirdTriangle();
        this.movingElements.forEach((element) => element.update());
        drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);

        if (superDotEaten === 1) this.circle.superMode();
        if (superDotEaten === 2)
            this.triangles.forEach((triangle) => {
                triangle.superMode();
            });
    }

    pause() {
        this.lives++;
        clearInterval(this.gameInterval);

        if (this.lives === 3) {
            gameOverPanel(this.k);
        } else {
            this.lostLife();
        }

        drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);
    }

    addThirdTriangle() {
        if (
            this.dotsAndPoints.getPoints() === thirdTrianglePoints &&
            this.triangles.length === 2
        ) {
            this.triangles.push(new Triangle(20, 500));
            this.movingElements.push(this.triangles[2]);
        }
    }

    lostLife() {
        this.movingElements.forEach((element) => element.restartPosition());
        lostLifePanel();
        setTimeout(() => {
            this.gameInterval = setInterval(() => {
                this.updateGameArea();
            }, 20);
            this.clickedKey = 0;
        }, 2000);
    }
}
