import contextService from "services/ContextService.js";

export function lostLifePanel() {
    const size = [150, 180, 220, 160]; //(x,y,L,H)
    const ctx = contextService.getContext();
    ctx.strokeStyle = "white";
    ctx.clearRect(...size);
    ctx.beginPath();
    ctx.rect(...size);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("You lost life", 190, 265);
}

export function pausePanel() {
    const size = [150, 180, 220, 160]; //(x,y,L,H)
    const ctx = contextService.getContext();
    ctx.strokeStyle = "white";
    ctx.clearRect(...size);
    ctx.beginPath();
    ctx.rect(...size);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("Pause", 220, 245);
    ctx.font = "15px Arial";
    ctx.fillText("Press 'p' to continue", 195, 305);
}
