import ObjectC from "./game_elements/ObjectC.js";
import LifeCycle from "./game_elements/lifeCycle.js";
import welcomeWindow from "./welcomWindow.js";

export default class Game {
    context;
    lifeCycle;
    clickedKey = { _: 0 };

    flagForEnter = {
        _: 1,
        activateNavigation: function () {
            this._ = 1;
        },
    };

    constructor() {
        this.context = document.getElementById("stockGraph").getContext("2d");
        ObjectC.myGameArea = this.context;
        welcomeWindow(this.context);

        const enterWhenStartingGame = (e) => {
            this.enterWhenStartingGame(e);
        };
        this.startButtons = enterWhenStartingGame;
        window.addEventListener("keydown", enterWhenStartingGame);
    }

    enterWhenStartingGame(e) {
        if (e.keyCode === 13) {
            window.removeEventListener("keydown", this.startButtons);
            window.addEventListener("keydown", (e) => {
                this.gameNavigation(e);
            });

            this.lifeCycle = new LifeCycle(
                this.context,
                this.flagForEnter,
                this.clickedKey,
            );
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
