import ObjectC from './game_elements/ObjectC.js';
import LifeCycle from './game_elements/lifeCycle.js';

/*============================
Class Game: 
    1. Constructor
============================*/

export default class Game {
    context;
    lifeCycle;

    counterWhenLifeIsLost = {
        _:0,
        restart: function() {
            this._ = 0;
        }
    };
    
    clickedKey = {_:0};

    flagForEnter = {
        _:1,
        activateNavigation: function() {
            this._ = 1;
        }
    };

    /* ======== 1.Constructor ======== */
    constructor () {
        this.context = document.getElementById('stockGraph').getContext("2d");

        ObjectC.myGameArea = this.context;
        
        this.lifeCycle = new LifeCycle(this.context, this.counterWhenLifeIsLost, this.flagForEnter, this.clickedKey);

        const r = this;
        this.addListeners(r);
        this._startWindow ()
    }


    /* ======== 2. Start Window ======== */
    addListeners (r) {
        window.addEventListener("keydown", enterWhenStartingGame);

        function enterWhenStartingGame (e) {
            if (e.keyCode === 13) {
                window.removeEventListener("keydown", enterWhenStartingGame)
                window.addEventListener("keydown", navigation);
                const gameInterval = setInterval(function () {r.lifeCycle.updateGameArea()}, 20);
                r.lifeCycle.setGameInterval(gameInterval);
            }
        }

        function navigation (e) {
            var key = e.keyCode; 

            if (r.flagForEnter._ === 1) {
                if (key === 37) {
                    r.clickedKey._ = 1;
                } else if (key === 38) {
                    r.clickedKey._ = 2;
                } else if (key === 39) {
                    r.clickedKey._ = 3;
                } else if (key === 40) {
                    r.clickedKey._ = 4;
                }
            }
            if (r.flagForEnter._ === 2) {
                if(key === 13) { //Enter when starting NEW game
                    r.lifeCycle.restartGame();
                }
            }
        };
    }

    _startWindow() {
        var ctx = this.context;

        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.fillText('ROR',190,110);

        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText('Press ENTER to start game',100,235);
        
        ctx.font = "14px Arial";
        ctx.fillText('Rules:',100,320);
        ctx.fillText('1. Avoid Triangles.',100,340);
        ctx.fillText('2. Get as many dots as you can.',100,360);
        ctx.fillText('3. Use keybord arrows to navigate.',100,380);
        ctx.fillText('3. 404 = Game Over.',100,400);
        ctx.fillText('P.S. Triangles can move faster than you think.',100,420);

        ctx.font = "11px Arial";
        ctx.fillText('Created by Jakub Nowak.',200,490);
    }   
}