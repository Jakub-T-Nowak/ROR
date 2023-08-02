import ObjectC from "../ObjectC.js";

export default class RoundedRect extends ObjectC {
    static radius = 3;

    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        var rect = RoundedRect.myGameArea;
        rect.strokeStyle = "white";
        rect.lineWidth = 2;
        rect.beginPath();
        rect.moveTo(this.x, this.y + RoundedRect.radius);
        rect.lineTo(this.x, this.y + this.height - RoundedRect.radius);
        rect.arcTo(
            this.x,
            this.y + this.height,
            this.x + RoundedRect.radius,
            this.y + this.height,
            RoundedRect.radius,
        );
        rect.lineTo(
            this.x + this.width - RoundedRect.radius,
            this.y + this.height,
        );
        rect.arcTo(
            this.x + this.width,
            this.y + this.height,
            this.x + this.width,
            this.y + this.height - RoundedRect.radius,
            RoundedRect.radius,
        );
        rect.lineTo(this.x + this.width, this.y + RoundedRect.radius);
        rect.arcTo(
            this.x + this.width,
            this.y,
            this.x + this.width - RoundedRect.radius,
            this.y,
            RoundedRect.radius,
        );
        rect.lineTo(this.x + RoundedRect.radius, this.y);
        rect.arcTo(
            this.x,
            this.y,
            this.x,
            this.y + RoundedRect.radius,
            RoundedRect.radius,
        );
        rect.stroke();
    }
}
