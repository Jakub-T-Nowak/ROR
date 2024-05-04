//0,0_________ X
//  |         5,0
//  |
//  |
//  |0,5      5,5
//  Y

import contextService from "services/ContextService.js";

const RADIUS = 3;

export const drawRectangle = ({ x, y, width, height }) => {
    const ctx = contextService.getContext();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + RADIUS);
    ctx.lineTo(x, y + height - RADIUS);
    ctx.arcTo(x, y + height, x + RADIUS, y + height, RADIUS);
    ctx.lineTo(x + width - RADIUS, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - RADIUS, RADIUS);
    ctx.lineTo(x + width, y + RADIUS);
    ctx.arcTo(x + width, y, x + width - RADIUS, y, RADIUS);
    ctx.lineTo(x + RADIUS, y);
    ctx.arcTo(x, y, x, y + RADIUS, RADIUS);
    ctx.stroke();
};
