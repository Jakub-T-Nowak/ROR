import CircleDrawning from "./drawnings/CircleDrawning.js";
import { KEY } from "../LifeCycle.js";
import { rectanglesCoordinates } from "../Coordinates.js";
import { collisionControl } from "./CollisionControl.js";

/*============================
Class Circle:
    Update
    New Position
    Collision Control
============================*/

export default class Circle {
    x;
    y;
    board;
    turbo = 1;
    speedX = 0;
    speedY = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.board = rectanglesCoordinates();
        this.drawning = new CircleDrawning(x, y);
        this.radius = this.drawning.radius;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    get xy() {
        return { x: this.x, y: this.y };
    }

    get params() {
        return { ...this.xy, sX: this.speedX, sY: this.speedY };
    }

    superMode() {
        this.turbo = 2;
        setTimeout(() => {
            this.turbo = 1;
        }, 5000);
    }

    update() {
        this.drawning.update(this.params);
    }

    newPos(clickedKey) {
        this._encodingSpeed(clickedKey);
        this._calculateNewPosition();
    }

    restartPosition() {
        this.speedX = 0;
        this.speedY = 0;
        this.x = 20;
        this.y = 20;
    }

    _encodingSpeed(clickedKey) {
        switch (clickedKey) {
            case KEY.LEFT:
                this.speedX = -2;
                break;
            case KEY.UP:
                this.speedY = -2;
                break;
            case KEY.RIGHT:
                this.speedX = 2;
                break;
            case KEY.DOWN:
                this.speedY = 2;
                break;
        }
    }

    _calculateNewPosition() {
        // == rectangles ==
        const resultsForX = this.board.map((rectangle, index) => {
            return collisionControl(
                this.xy,
                this.speedX,
                this.radius,
                rectangle,
                index,
                "x",
            );
        });

        const resultsForY = this.board.map((rectangle, index) => {
            return collisionControl(
                this.xy,
                this.speedY,
                this.radius,
                rectangle,
                index,
                "y",
            );
        });
        if (resultsForX.includes(true)) {
            this.speedX = 0;
        }
        if (resultsForY.includes(true)) {
            this.speedY = 0;
        }

        // == rules of changing direction on intersection ==
        if (this.speedY !== 0 && this.speedXm1 !== 0) {
            this.speedX = 0;
        }
        if (this.speedX !== 0 && this.speedY !== 0) {
            this.speedY = 0;
        }
        this.speedXm1 = this.speedX;

        // == turbo ==
        this.x += this.speedX * this.turbo;
        this.y += this.speedY * this.turbo;
    }
}
