import Triangle from "./MovingElements/Triangle.js";
import Board from "./Board/Board.js";
import Circle from "./MovingElements/Circle.js";
import Dots from "./Dots.js";
import gameOverPanel from "./GameOverPanel.js";
import lostLifePanel from "./LostLifePanel.js";
import contextService from "services/ContextService.js";

const thirdTrianglePoints = 195;

export default class LifeCycle {
    ctx; //type: Object ? DOM ?
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

    get #context() {
        return contextService;
    }

    constructor(k) {
        this.ctx = this.#context.getContext();
        this.k = k;
        this.dotsAndPoints = new Dots();
        this.rect = new Board();
        this.circle = new Circle(20, 20, this.rect);
        this.triangles.push(
            new Triangle(500, 500, this.rect),
            new Triangle(20, 500, this.rect),
        );
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
        this.ctx.clearRect(0, 0, 520, 520);
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
        this._drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);

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

        this._drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);
    }

    addThirdTriangle() {
        if (
            this.dotsAndPoints.getPoints() === thirdTrianglePoints &&
            this.triangles.length === 2
        ) {
            this.triangles[2] = new Triangle(20, 500, this.rect);
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

    _drawPointsAndLives(points, lives) {
        const ctx = this.ctx;
        ctx.clearRect(205, 42, 110, 115);

        //points
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("points: " + points + "0", 210, 144);

        //lives
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";

        if (lives === 1) {
            ctx.fillText("4", 232, 70);
        } else if (lives === 2) {
            ctx.fillText("4", 232, 70);
            ctx.fillText("0", 252, 70);
        } else if (lives === 3) {
            ctx.fillText("4", 232, 70);
            ctx.fillText("0", 252, 70);
            ctx.fillText("4", 272, 70);
        }
    }
}
