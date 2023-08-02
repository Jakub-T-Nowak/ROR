import ObjectC from "../ObjectC.js";

const PI = Math.PI;

const DIRECTION = {
    stop: "STOP",
    right: "RIGHT",
    left: "LEFT",
    up: "UP",
    down: "DOWN",
};

export default class PacManDrawning extends ObjectC {
    ctx = PacManDrawning.myGameArea;
    direction = DIRECTION.stop;
    prev = 0;
    i = 0.1;
    flag = 0;

    _getDirection(speedX, speedY) {
        if (speedY == 0 && speedX == 0) {
            return DIRECTION.stop;
        } else if (speedY < 0 && speedX == 0) {
            return DIRECTION.up;
        } else if (speedY > 0 && speedX == 0) {
            return DIRECTION.down;
        } else if (speedY == 0 && speedX > 0) {
            return DIRECTION.right;
        } else if (speedY == 0 && speedX < 0) {
            return DIRECTION.left;
        }
    }

    _getDirectionCorrection() {
        switch (this.direction) {
            case DIRECTION.stop:
                return this.prev;
            case DIRECTION.right:
                return 0;
            case DIRECTION.left:
                return PI;
            case DIRECTION.up:
                return -0.5 * PI;
            case DIRECTION.down:
                return 0.5 * PI;
        }
    }

    _getOpeningCorrection() {
        if (this.direction === DIRECTION.stop) {
            return this.i;
        }

        this.i += this.flag;

        if (this.i >= 1) {
            this.flag = -0.1;
        }
        if (this.i <= 0.1) {
            this.flag = 0.1;
        }

        return this.i;
    }

    /* ======== 2. Animation - what to draw ======== */
    _animation() {
        const directionCorrection = this._getDirectionCorrection();
        this.prev = directionCorrection;
        const openingCorrection = this._getOpeningCorrection();

        const startAngle = 0.25 * PI + directionCorrection - openingCorrection;
        const endAngle = 1.75 * PI + directionCorrection + openingCorrection;

        //draw
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 19, startAngle, endAngle);
        this.ctx.lineTo(0, 0);
        this.ctx.fill();
    }

    /* ======== 3. Update - where to draw ======== */
    update(x, y, speedX, speedY) {
        this.direction = this._getDirection(speedX, speedY);
        this.ctx.translate(x, y);
        this._animation();
        this.ctx.translate(-x, -y);
    }
}
