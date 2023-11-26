import contextService from "services/ContextService.js";

export default class CircleDrawning {
    x;
    y;
    speedX = 0;
    speedY = 0;
    b = 0;
    ctx = CircleDrawning.myGameArea;
    i = 100;
    flag = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get #context() {
        return contextService;
    }

    get radius() {
        return 20;
    }

    //depending on direction of the Circle center of the Circle is changing its position
    #circleCenterPosition() {
        const position = { x: 0, y: 0 };

        if (this.speedY == 0 && this.speedX == 0) {
            position.x = 0;
            position.y = 0;
        } else if (this.speedY < 0 && this.speedX == 0) {
            position.x = 0;
            position.y = -19;
        } else if (this.speedY > 0 && this.speedX == 0) {
            position.x = 0;
            position.y = 19;
        } else if (this.speedY == 0 && this.speedX > 0) {
            position.x = 19;
            position.y = 0;
        } else if (this.speedY == 0 && this.speedX < 0) {
            position.x = -19;
            position.y = 0;
        }

        return position;
    }

    //changing shades of gray
    #setGreyShade() {
        this.i += this.flag;
        this.i === 252 && (this.flag = -4);
        this.i === 100 && (this.flag = 4);
    }

    /* ======== 2. Animation- what to draw ======== */
    #animation() {
        const ctx = this.#context.getContext();
        const position = this.#circleCenterPosition();
        this.#setGreyShade();
        //create canvas gradient
        const gradient = ctx.createRadialGradient(
            position.x,
            position.y,
            0,
            0,
            0,
            19,
        );
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.1, `rgb(${this.i},${this.i},${this.i})`);
        gradient.addColorStop(1, "rgb(100, 100, 100)");
        ctx.fillStyle = gradient;
        //draw
        ctx.beginPath();
        ctx.arc(0, 0, 19, 0, Math.PI * 2);
        ctx.fill();
    }

    /* ======== 3. Update - where to draw ======== */
    update(x, y, speedX, speedY) {
        const ctx = this.#context.getContext();
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        ctx.translate(this.x, this.y);
        this.#animation();
        ctx.translate(-this.x, -this.y);
    }
}
