//0,0_________ X
//  |         5,0
//  |
//  |
//  |0,5      5,5
//  Y

import RoundedRect from "./Rectangle.js";
import contextService from "services/ContextService.js";
import { rectanglesCoordinates } from "../Coordinates.js";

export default class Board {
    board = [];
    coordinates = [];

    get #context() {
        return contextService;
    }

    constructor() {
        this.#createBoard();
    }

    #createBoard() {
        this.coordinates = rectanglesCoordinates();
        this.coordinates.forEach((c) => {
            this.board.push(new RoundedRect(c));
        });
    }

    getBoard() {
        return this.board;
    }

    drawBoard() {
        const ctx = this.#context.getContext();
        // 0 is a board rectangle
        const { x, y, width, height } = this.coordinates[0];
        ctx.clearRect(x, y, width, height);
        this.board.forEach((rect) => rect.draw());
    }

    collisionControl(xP, yP, speed) {
        const pathWidth = 20;
        return this.board.some((rect) => {
            const a = xP == rect.y - pathWidth;
            const b = yP > rect.x - pathWidth;
            const c = yP < rect.x + rect.height + pathWidth;
            const d = speed > 0;

            const e = xP == rect.y + rect.width + pathWidth;

            return (a && b && c && d) || (e && b && c && !d);
        });
    }
}
