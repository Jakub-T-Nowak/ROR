import Triangle from "./movingElements/Triangle";
import { drawBoard } from "./board/DrawBoard";
import Circle from "./movingElements/Circle";
import Dots from "./Dots";
import gameOverPanel from "./GameOverPanel";
import { lostLifePanel, pausePanel } from "./LostLifePanel";
import drawPointsAndLives from "./DrawPointsAndLives";

const thirdTrianglePoints = 195;

// move to separate file.
export const KEY = {
    UP: "top",
    RIGHT: "right",
    DOWN: "bottom",
    LEFT: "left",
};

export default class LifeCycle {
    circle; //type: Circle
    triangles = []; //type: [] Triangle
    dotsAndPoints; //type: Dots
    movingElements; //type: [] Circle
    lives = 0;
    clickedKey;
    gameInterval; //type: number, interval id

    gameNavigation = {
        ArrowLeft: () => {
            this.clickedKey = KEY.LEFT;
        },
        ArrowUp: () => {
            this.clickedKey = KEY.UP;
        },
        ArrowRight: () => {
            this.clickedKey = KEY.RIGHT;
        },
        ArrowDown: () => {
            this.clickedKey = KEY.DOWN;
        },
        KeyP: () => {
            this.userPause();
        },
    };

    constructor(k) {
        this.k = k;
        this.dotsAndPoints = new Dots();
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
        drawBoard();
        this.movingElements.forEach((element) =>
            element.newPos(
                this.clickedKey,
                this.circle.params,
                this.dotsAndPoints.getPoints(),
            ),
        );
        const superDotEaten = this.dotsAndPoints.drawDots(this.circle.xy);
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

    userPause() {
        clearInterval(this.gameInterval);
        const start = () => {
            this.k.rules = this.gameNavigation;
            this.gameInterval = setInterval(() => {
                this.updateGameArea();
            }, 20);
        };
        this.k.rules = {
            KeyP: () => {
                start();
            },
        };
        pausePanel();
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
        this.k.rules = {};
        lostLifePanel();
        setTimeout(() => {
            this.gameInterval = setInterval(() => {
                this.updateGameArea();
            }, 20);
            this.k.rules = this.gameNavigation;
            this.clickedKey = 0;
        }, 2000);
    }
}
