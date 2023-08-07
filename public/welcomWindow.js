import LifeCycle from "./game_elements/LifeCycle.js";
import KeyEvent from "./KeyEvent.js";
import contextService from "services/ContextService.js";

export default function welcomeWindow() {
    const ctx = contextService.getContext();
    const k = new KeyEvent();
    k.rules = {
        Enter: () => {
            const lifeCycle = new LifeCycle(k);
            lifeCycle.startGame();
        },
    };

    ctx.fillStyle = "white";
    ctx.font = "60px Arial";
    ctx.fillText("ROR", 190, 110);

    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("Press ENTER to start game", 100, 235);

    ctx.font = "14px Arial";
    ctx.fillText("Rules:", 100, 320);
    ctx.fillText("1. Avoid Triangles.", 100, 340);
    ctx.fillText("2. Get as many dots as you can.", 100, 360);
    ctx.fillText("3. Use keybord arrows to navigate.", 100, 380);
    ctx.fillText("3. 404 = Game Over.", 100, 400);
    ctx.fillText("P.S. Triangles can move faster than you think.", 100, 420);

    ctx.font = "11px Arial";
    ctx.fillText("Created by Jakub Nowak.", 200, 490);
}
