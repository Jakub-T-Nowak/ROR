import contextService from "services/ContextService.js";

export default function drawPointsAndLives(points, lives) {
    const ctx = contextService.getContext();
    
    ctx.clearRect(205, 42, 110, 115);

    //points
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("points: " + points + "0", 210, 144);

    //lives
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";

    if (lives === 1) {
        ctx.fillText("4", 232, 70);
    } else if (lives === 2) {
        ctx.fillText("4", 232, 70);
        ctx.fillText("0", 252, 70);
    } else if (lives === 3) {
        ctx.fillText("4", 232, 70);
        ctx.fillText("0", 252, 70);
        ctx.fillText("4", 272, 70);
    }
}
