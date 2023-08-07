import welcomeWindow from "./WelcomWindow.js";
import contextService from "./ContextService.js";

export default class Game {
    get #context() {
        return contextService;
    }

    constructor() {
        const context = document
            .getElementById("gameCanvasElement")
            .getContext("2d");
        this.#context.setContext(context);
        welcomeWindow();
    }
}
