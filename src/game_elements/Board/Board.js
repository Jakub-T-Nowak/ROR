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
    board;
    coordinates = [];

    get #context() {
        return contextService;
    }

    constructor() {
        this.coordinates = rectanglesCoordinates();
        this.board = this.coordinates.map((c) => new RoundedRect(c));
    }

    drawBoard() {
        const ctx = this.#context.getContext();
        // 0 is the game border
        const { x, y, width, height } = this.coordinates[0];
        ctx.clearRect(x, y, width, height);
        this.board.forEach((rect) => rect.draw());
    }
}
