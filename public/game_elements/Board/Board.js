import RoundedRect from "./Rectangle.js";

export default class LifeCycle {
    board;

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
        this.board.forEach((rect) => rect.draw());
    }

    r1(xP, yP, speed) {
        const z = 20;
        return this.board.some((rect) => {
            const a = xP == rect.x - z;
            const b = yP > rect.y - z;
            const c = yP < rect.y + rect.height + z;
            const d = speed >= 0;

            const e = xP == rect.x + rect.width + z;
            const f = yP > rect.y - z;
            const g = yP < rect.y + rect.height + z;
            const h = speed <= 0;

            return (a && b && c && d) || (e && f && g && h);
        });
    }

    r1(xP, yP, speed) {
        const z = 20;
        return this.board.some((rect) => {
            const a = xP == rect.y - z;
            const b = yP > rect.x - z;
            const c = yP < rect.x + rect.height + z;
            const d = speed >= 0;

            const e = xP == rect.y + rect.width + z;
            const f = yP > rect.x - z;
            const g = yP < rect.x + rect.height + z;
            const h = speed <= 0;

            return (a && b && c && d) || (e && f && g && h);
        });
    }

    r1_(k, a, b) {
        const aa = this[a] == rect[a] - 20;
        const bb = this[b] > rect[b] - 20;
        const c = this[b] < rect[b] + rect.height + 20;
        const d = this[`speed${a.toUpperCase()}`] >= 0;

        const e = this[a] == rect[a] + rect.width + 20;
        const f = this[b] > rect[b] - 20;
        const g = this[b] < rect[b] + rect.height + 20;
        const h = this[`speed${a.toUpperCase()}`] <= 0;
        return (aa && bb && c && d) || (e && f && g && h);
    }
}
