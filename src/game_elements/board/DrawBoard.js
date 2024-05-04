//0,0_________ X
//  |         5,0
//  |
//  |
//  |0,5      5,5
//  Y

import { drawRectangle } from "./DrawRectangle";
import contextService from "services/ContextService";
import { rectanglesCoordinates } from "../Coordinates";

export const drawBoard = () => {
    const coordinates = rectanglesCoordinates();
    const ctx = contextService.getContext();
    // 0 is the game border
    const { x, y, width, height } = coordinates[0];
    ctx.clearRect(x, y, width, height);
    coordinates.forEach((c) => drawRectangle(c));
};
