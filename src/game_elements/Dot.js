import contextService from "services/ContextService.js";

export default class Dot {
    x; //type: Int
    y; //type: Int
    visible; // type: Boolean
    super; // type: Int

    get #context() {
        return contextService;
    }

    constructor({x, y}) {
        this.x = x;
        this.y = y;
        this.visible = true;
        this.super = 0;
    }

    setSuper(value) {
        this.super = value;
    }

    checkForContact(pacX, pacY) {
        if (this.x === pacX && this.y === pacY && this.visible) {
            this.visible = false;
            return true;
        }
        return false;
    }

    makeVisible() {
        this.visible = true;
    }

    drawDot() {
        const ctx = this.#context.getContext();

        if (this.visible === true) {
            let size;
            if (this.super === 0) size = 2;
            if (this.super === 1) size = 6;
            if (this.super === 2) size = 7;

            if (this.super === 0 || this.super === 1) ctx.fillStyle = "white";
            if (this.super === 2) ctx.fillStyle = "red";

            ctx.beginPath();
            ctx.arc(this.x, this.y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
