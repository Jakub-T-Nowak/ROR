import CircleDrawning from "./drawnings/CircleDrawning.js";
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
    b = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.board = rectanglesCoordinates();
        this.gameBackground = this.board[0];
        this.drawning = new CircleDrawning(x, y);
        this.radius = this.drawning.radius;
    }
    
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getXY() {
        return { x: this.x, y: this.y };
    }

    getParams() {
        return { ...this.getXY() , sX: this.speedX, sY: this.speedY };
    }

    superMode() {
        this.turbo = 2;
        setTimeout(() => {
            this.turbo = 1;
        }, 5000);
    }

    update() {
        this.drawning.update(this.x, this.y, this.speedX, this.speedY);
    }

    newPos(clickedKey) {
        this.b = clickedKey;
        this._encodingSpeed();
        this._calculateNewPosition();
    }

    restartPosition() {
        this.b = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.x = 20;
        this.y = 20;
    }

    _encodingSpeed() {
        if (this.b == 1) {
            this.speedX = -2;
        } else if (this.b == 2) {
            this.speedY = -2;
        } else if (this.b == 3) {
            this.speedX = 2;
        } else if (this.b == 4) {
            this.speedY = 2;
        }
    }

    _calculateNewPosition() {
        // == rectangles ==
        const resultsForX = this.board.map((rectangle, index) => {
            const type = index ? "rectangle" : "border";
            return collisionControl(
                this.getXY(),
                this.speedX,
                this.radius,
                rectangle,
                index,
                "x",
            );
        });

        const resultsForY = this.board.map((rectangle, index) => {
            const type = index ? "rectangle" : "border";
            return collisionControl(
                this.getXY(),
                this.speedY,
                this.radius,
                rectangle,
                index,
                "y",
            );
        });
        this.speedX = resultsForX.includes(true) ? 0 : this.speedX;
        this.speedY = resultsForY.includes(true) ? 0 : this.speedY;

        // == rules of changing direction on intersection ==
        if (0 < this.speedY && this.speedXm1 !== 0) {
            this.speedX = 0;
            this.speedY = 2;
        }
        if (0 > this.speedY && this.speedXm1 !== 0) {
            this.speedX = 0;
            this.speedY = -2;
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
