import RoundedRect from "./Rectangle.js";
import contextService from "services/ContextService.js";

export default class Board {
    board;

    get #context() {
        return contextService;
    }

    constructor() {
        const width = 120;
        const height = 120;
        this.board = [
            new RoundedRect(0, 0, 520, 520),

            new RoundedRect(40, 40, width, height),
            new RoundedRect(200, 40, width, height),
            new RoundedRect(360, 40, width, height),

            new RoundedRect(40, 200, width, height),
            new RoundedRect(200, 200, width, height),
            new RoundedRect(360, 200, width, height),

            new RoundedRect(40, 360, width, height),
            new RoundedRect(200, 360, width, height),
            new RoundedRect(360, 360, width, height),
        ];
    }

    getBoard() {
        return this.board;
    }

    drawBoard() {
        const ctx = this.#context.getContext();
        ctx.clearRect(0, 0, 520, 520);
        this.board.forEach((rect) => rect.draw());
    }

    collisionControl(xP, yP, speed) {
        const z = 20;
        return this.board.some((rect) => {
            const a = xP == rect.y - z;
            const b = yP > rect.x - z;
            const c = yP < rect.x + rect.height + z;
            const d = speed > 0;

            const e = xP == rect.y + rect.width + z;

            return (a && b && c && d) || (e && b && c && !d);
        });
    }
}
