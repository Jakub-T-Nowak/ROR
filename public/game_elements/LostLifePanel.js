import contextService from "services/ContextService.js";

export default function lostLifePanel() {
    const ctx = contextService.getContext();
    ctx.strokeStyle = "white";
    ctx.clearRect(150, 180, 220, 160); //(x,y,L,H)
    ctx.beginPath();
    ctx.rect(150, 180, 220, 160);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("You lost life", 190, 265);
}
