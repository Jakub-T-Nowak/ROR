import ObjectC from "./game_elements/ObjectC.js";
import welcomeWindow from "./WelcomWindow.js";
export default class Game {
    constructor() {
        const context = document
            .getElementById("gameCanvasElement")
            .getContext("2d");
        
        ObjectC.myGameArea = context;
        welcomeWindow(context);
    }
}
