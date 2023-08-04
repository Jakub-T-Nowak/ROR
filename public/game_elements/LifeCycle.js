import Triangle from "./MovingElements/Triangle.js";
import Board from "./Board/Board.js";
import Circle from "./MovingElements/Circle.js";
import Dots from "./Dots.js";
import gameOverWindow from "./GameOverWindow.js";

export default class LifeCycle {
    ctx; //type: Object ? DOM ?
    circle; //type: Circle
    rect; //type: [] Rectangle
    triangles = new Array(); //type: [] Triangle
    dotsAndPoints; //type: Dots
    movingElements; //type: [] Circle
    lives = 0; //type: Int
    gameInterval;
    gameOverFlag = false; //type: Boolean
    counterWhenLifeIsLost = 0;
    clickedKey = { _: 0 };

    gameNavigation = {
        ArrowLeft: () => {
            this.clickedKey._ = 1;
        },
        ArrowUp: () => {
            this.clickedKey._ = 2;
        },
        ArrowRight: () => {
            this.clickedKey._ = 3;
        },
        ArrowDown: () => {
            this.clickedKey._ = 4;
        },
    };

    constructor(ctx, k) {
        this.ctx = ctx;
        this.k = k;
        this.dotsAndPoints = new Dots();
        this.rect = new Board();

        this.circle = new Circle(20, 20, this.rect);
        this.triangles[0] = new Triangle(500, 500, this.rect);
        this.triangles[1] = new Triangle(20, 500, this.rect);
        this.movingElements = [this.circle, ...this.triangles];
    }

    startGame() {
        this.k.rules = this.gameNavigation;
        this.gameInterval = setInterval(() => {
            this.updateGameArea();
        }, 20);
    }

    updateGameArea() {
        this.checkIfLifeIsLost() && this.counterWhenLifeIsLost++;
        this.counterWhenLifeIsLost === 0 ? this.gameStep() : this.pause();
    }

    checkIfLifeIsLost() {
        return this.triangles.some((triangle) => {
            const Dx = Math.abs(this.circle.getX() - triangle.getX());
            const Dy = Math.abs(this.circle.getY() - triangle.getY());
            return Dx < 20 && Dy < 20 ? true : false;
        });
    }

    gameStep() {
        this.ctx.clearRect(0, 0, 520, 520);
        this.rect.drawBoard();
        this.movingElements.forEach((element) =>
            element.newPos(
                this.clickedKey._,
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

    addThirdTriangle() {
        if (
            this.dotsAndPoints.getPoints() === 195 &&
            this.triangles.length === 2
        ) {
            this.triangles[2] = new Triangle(20, 500, this.rect);
            this.movingElements.push(this.triangles[2]);
        }
    }

    pause() {
        this.checkForGameOver();
        this.gameOverFlag ? this.gameOver() : this.lostLife();
    }

    checkForGameOver() {
        if (this.counterWhenLifeIsLost === 1) {
            this.gameOverFlag = this.lives === 2 ? true : false;
        }
    }

    lostLife() {
        if (this.counterWhenLifeIsLost === 1) {
            this.lives++;
            this.movingElements.forEach((element) => element.restartPosition());
            this._lostLifeWindow();
            this._drawPointsAndLives(
                this.dotsAndPoints.getPoints(),
                this.lives,
            );
            clearInterval(this.gameInterval);
            setTimeout(() => {
                this.gameInterval = setInterval(() => {
                    this.updateGameArea();
                }, 20);
                this.counterWhenLifeIsLost = 0;
                this.clickedKey._ = 0;
            }, 2000);
        }
    }

    gameOver() {
        this.lives++;
        clearInterval(this.gameInterval);
        gameOverWindow(this.ctx, this.k);
        this._drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);
    }

    _lostLifeWindow() {
        var ctx = this.ctx;
        ctx.strokeStyle = "white";
        ctx.clearRect(150, 180, 220, 160); //(x,y,L,H)
        ctx.beginPath();
        ctx.rect(150, 180, 220, 160);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("You lost life", 190, 265);
        ctx.clearRect(205, 42, 110, 115);
    }

    _drawPointsAndLives(points, lives) {
        //points
        const ctx = this.ctx;
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
