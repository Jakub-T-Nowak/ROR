import ObjectC from "./game_elements/ObjectC.js";
import LifeCycle from "./game_elements/lifeCycle.js";
import welcomeWindow from "./welcomWindow.js";

export default class Game {
    lifeCycle;
    clickedKey = { _: 0 };

    flagForEnter = {
        _: 1,
        activateNavigation: function () {
            this._ = 1;
        },
    };

    constructor() {
        const context = document.getElementById("stockGraph").getContext("2d");

        ObjectC.myGameArea = context;

        this.lifeCycle = new LifeCycle(
            context,
            this.flagForEnter,
            this.clickedKey
        );

        this.addListeners();
        welcomeWindow(context);
    }

    addListeners() {
        const enterWhenStartingGame = (e) => {this.enterWhenStartingGame(e)};
        this.startButtons = enterWhenStartingGame;
        window.addEventListener("keydown", enterWhenStartingGame);
    }

    enterWhenStartingGame(e) {
        if (e.keyCode === 13) {
            window.removeEventListener("keydown", this.startButtons);
            window.addEventListener("keydown", (e) => { this.gameNavigation(e) });
            this.lifeCycle.start();
        }
    }

    gameNavigation(e) {
        var key = e.keyCode;

        if (this.flagForEnter._ === 1) {
            if (key === 37) {
                this.clickedKey._ = 1;
            } else if (key === 38) {
                this.clickedKey._ = 2;
            } else if (key === 39) {
                this.clickedKey._ = 3;
            } else if (key === 40) {
                this.clickedKey._ = 4;
            }
        }
        if (this.flagForEnter._ === 2) {
            if (key === 13) {
                //Enter when starting NEW game
                this.lifeCycle.restartGame();
            }
        }
    }
}
