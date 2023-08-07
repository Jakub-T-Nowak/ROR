import contextService from "services/ContextService.js";

export default class RoundedRect {
    static radius = 3;

    get #context() {
        return contextService;
    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        const ctx = this.#context.getContext();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + RoundedRect.radius);
        ctx.lineTo(this.x, this.y + this.height - RoundedRect.radius);
        ctx.arcTo(
            this.x,
            this.y + this.height,
            this.x + RoundedRect.radius,
            this.y + this.height,
            RoundedRect.radius,
        );
        ctx.lineTo(
            this.x + this.width - RoundedRect.radius,
            this.y + this.height,
        );
        ctx.arcTo(
            this.x + this.width,
            this.y + this.height,
            this.x + this.width,
            this.y + this.height - RoundedRect.radius,
            RoundedRect.radius,
        );
        ctx.lineTo(this.x + this.width, this.y + RoundedRect.radius);
        ctx.arcTo(
            this.x + this.width,
            this.y,
            this.x + this.width - RoundedRect.radius,
            this.y,
            RoundedRect.radius,
        );
        ctx.lineTo(this.x + RoundedRect.radius, this.y);
        ctx.arcTo(
            this.x,
            this.y,
            this.x,
            this.y + RoundedRect.radius,
            RoundedRect.radius,
        );
        ctx.stroke();
    }
}
