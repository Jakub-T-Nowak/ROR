import contextService from "services/ContextService.js";

export default class TriangleDrawning {
    x;
    y;
    spin = 1;
    colors = [
        "blue",
        "BlueViolet",
        "Chartreuse",
        "Crimson",
        "Cyan",
        "DarkOrange",
        "Red",
        "Yellow",
    ];
    colorNumber = 0;

    get #context() {
        return contextService;
    }

    /* ======== 1. Constructor ======== */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /* ======== 1. Animation ======== */
    update({x, y}) {
        const ctx = this.#context.getContext();
        this.x = x;
        this.y = y;

        if (this.spin === 1) {
            this.colorNumber = Math.floor(Math.random() * 8);
        }
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = this.colors[this.colorNumber];
        ctx.lineWidth = 3;

        ctx.rotate((Math.PI / 180) * this.spin + (Math.PI / 180) * 20);
        ctx.beginPath();
        ctx.moveTo(-14, 8);
        ctx.lineTo(0, -16);
        ctx.lineTo(14, 8);
        ctx.lineTo(-14, 8);
        ctx.stroke();
        ctx.rotate(-((Math.PI / 180) * this.spin + (Math.PI / 180) * 20));

        ctx.rotate(-((Math.PI / 180) * this.spin - (Math.PI / 180) * 10));
        ctx.beginPath();
        ctx.moveTo(-14, 8);
        ctx.lineTo(0, -16);
        ctx.lineTo(14, 8);
        ctx.lineTo(-14, 8);
        ctx.stroke();
        ctx.rotate((Math.PI / 180) * this.spin - (Math.PI / 180) * 10);
        ctx.translate(-this.x, -this.y);
        this.spin = this.spin + 4;

        if (this.spin === 357) {
            this.spin = 1;
        }
    }
}
