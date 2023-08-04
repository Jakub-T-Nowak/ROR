import LifeCycle from "./lifeCycle.js";

export default function gameOverWindow(context, k) {
    k.rules = {
        Enter: () => {
            const lifeCycle = new LifeCycle(context, k);
            lifeCycle.startGame();
        },
    };

    var ctx = context;
    ctx.strokeStyle = "white";
    ctx.clearRect(140, 20, 240, 480); //(x,y,L,H)
    ctx.beginPath();
    ctx.rect(140, 20, 240, 480);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("Game Over", 192, 290);
    ctx.font = "15px Arial";
    ctx.fillText("Press ENTER for new game", 171, 320);
    ctx.clearRect(205, 42, 110, 115);
}
