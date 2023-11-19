//0,0_________ X
//  |         5,0
//  |
//  |
//  |0,5      5,5
//  Y

import contextService from "services/ContextService.js";

const RADIUS = 3;

export default class RoundedRect {
    constructor({ x, y, width, height }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get #context() {
        return contextService;
    }

    draw() {
        const ctx = this.#context.getContext();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + RADIUS);
        ctx.lineTo(this.x, this.y + this.height - RADIUS);
        ctx.arcTo(
            this.x,
            this.y + this.height,
            this.x + RADIUS,
            this.y + this.height,
            RADIUS,
        );
        ctx.lineTo(this.x + this.width - RADIUS, this.y + this.height);
        ctx.arcTo(
            this.x + this.width,
            this.y + this.height,
            this.x + this.width,
            this.y + this.height - RADIUS,
            RADIUS,
        );
        ctx.lineTo(this.x + this.width, this.y + RADIUS);
        ctx.arcTo(
            this.x + this.width,
            this.y,
            this.x + this.width - RADIUS,
            this.y,
            RADIUS,
        );
        ctx.lineTo(this.x + RADIUS, this.y);
        ctx.arcTo(this.x, this.y, this.x, this.y + RADIUS, RADIUS);
        ctx.stroke();
    }
}
