import RoundedRect from './game_elements/Rectangle.js';
import Circle from './game_elements/Circle.js';
import ObjectC from './game_elements/ObjectC.js';
import Dots from './game_elements/Dots.js';
import Points from './game_elements/Points.js';
import Triangle from './game_elements/Triangle.js';

/*============================
Class Game:
    1. Constructor
    2. Start Window
    3. Update Game Area
    4. Lost Life
============================*/

export default class Game {
    gameBackground;
    rect;
    circle;
    dots;
    points;
    triangle1;
    triangle2;

    canvas;
    context;

    bestResults;

    counterWhenLifeIsLost = 0;
    flagForEnter = 0;

    /* ======== 1. Constructor ======== */
    constructor () {
        this.canvas = document.getElementById('stockGraph');
        this.context = this.canvas.getContext("2d");

        ObjectC.myGameArea = this.context;
        this.gameBackground = new RoundedRect(0, 0, 520, 520);
        this.rect = [new RoundedRect(40, 40, 120, 120),
                new RoundedRect(200, 40, 120, 120),
                new RoundedRect(360, 40, 120, 120),

                new RoundedRect(40, 200, 120, 120),
                new RoundedRect(200, 200, 120, 120),
                new RoundedRect(360, 200, 120, 120),

                new RoundedRect(40, 360, 120, 120),
                new RoundedRect(200, 360, 120, 120),
                new RoundedRect(360, 360, 120, 120)];
        this.circle = new Circle(20, 20, this.gameBackground, this.rect);
        this.triangle1 = new Triangle(500, 500, this.gameBackground, this.rect);
        this.triangle2 = new Triangle(20, 500, this.gameBackground, this.rect);
        this.dots = new Dots();
        this.points = new Points();

        var r = this;
        var t = function () {
            r.updateGameArea();
        }

        this.start(r, t);
    }

    /* ======== 2. Start Window ======== */
    start (r, t) {

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

        //keys functions
        window.addEventListener("keydown", function check(e) {
            var key = e.keyCode; 

            //Enter when starting game
            if (key === 13 && r.flagForEnter === 0) {
                r.flagForEnter = 1;
                setInterval(t, 20);
            }

            //navigation
            if (r.flagForEnter > 0) {
                if (key === 37) {
                    r.circle.b = 1; //lewo
                    r.triangle1.b = 1; 
                } else if (key === 38) {
                    r.circle.b = 2; //góra
                    r.triangle1.b = 2;
                } else if (key === 39) {
                    r.circle.b = 3; //prawo
                    r.triangle1.b = 3;       
                } else if (key === 40) {
                    r.circle.b = 4; //dół
                    r.triangle1.b = 4;
                }

                //Enter when starting NEW game
                if (key === 13 && r.flagForEnter === 2) {
                    r.counterWhenLifeIsLost = 0;
                    r.flagForEnter = 1;


                    


                    // fetch('http://localhost:3000/api', {
                    //     method: 'POST',
                    //     headers: {
                    //       'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         title: 'Ooo'
                    //     })
                    // }).then(function (response) {
                    //         if (response.ok) {
                    //             return response.json();
                    //         }
                    // });



                    r.points.life = 0;
                    r.dots.points = 0;
                    r.dots.makeDotsArray();
                }

            }
        });
    }

    /* ======== 3. Update Game Area ======== */
    updateGameArea() {
        this._lostLife();

        if (this.counterWhenLifeIsLost === 0) {
            this.context.clearRect(0, 0, 520, 520);  
            this.gameBackground.draw();
            this.circle.newPos();    
            this.triangle1.newPosB(this.circle.x, this.circle.y, this.circle.speedX, this.circle.triangle2);
            if (this.dots.points < 110){
                this.triangle2.newPosR(this.circle.x, this.circle.y, this.circle.speedX, this.circle.triangle2);
            } else {
                this.triangle2.newPosB(this.circle.x, this.circle.y, this.circle.speedX, this.circle.triangle2);
            }
            this.dots.drawDots(this.circle.x, this.circle.y);
            this.circle.update();
            this.points.draw(this.dots.points);
            this.triangle1.update();
            this.triangle2.update();

            for (let k = 0; k < this.rect.length; k++) {
                this.rect[k].draw();        
            }
        }
    }

    /* ======== 4. Lost Life ======== */
    _lostLife () {
        //collision control
        var Dx1 = Math.abs(this.circle.x - this.triangle1.x);
        var Dx2 = Math.abs(this.circle.x - this.triangle2.x);
        var Dy1 = Math.abs(this.circle.y - this.triangle1.y);
        var Dy2 = Math.abs(this.circle.y - this.triangle2.y);
        
        if ((Dx1 < 20 && Dy1 < 20) || (Dx2 < 20 && Dy2 < 20)){
            this.counterWhenLifeIsLost++;
            this.points.life++;

            if (this.points.life === 2) {
                fetch('https://ror-game.herokuapp.com//api')
                .then(response => response.json())
                .then(data => this.bestResults = data);
            }

            if (this.points.life === 3) {
                
                //this.bestResults[9].name + ' ' + this.bestResults[9].score

                this.flagForEnter = 2;
            }

            //starting position for Circle and triangles
            this.circle.b = this.circle.speedX = this.circle.speedY = this.circle.triangle2 = 0;
            this.circle.x = 20;
            this.circle.y = 20;
            this.triangle1.x = 500;
            this.triangle1.y = 500;
            this.triangle2.x = 20;
            this.triangle2.y = 500;
        }
        
        //window with comunicats
        if (this.counterWhenLifeIsLost > 0 && this.counterWhenLifeIsLost < 70) {
            if (this.points.life !== 3) {
                this.context.clearRect(150, 180, 220, 160);//(x,y,L,H)
                var ctx = this.context;
                ctx.beginPath();
                ctx.rect(150,180,220,160);
                ctx.stroke();
                ctx.fillStyle = "white";
                ctx.font = "25px Arial";
                ctx.fillText("You lost life" ,190,265);
            } else {
                this.context.clearRect(140, 20, 240, 480);//(x,y,L,H)
                var ctx = this.context;
                ctx.beginPath();
                ctx.rect(140, 20, 240, 480);
                ctx.stroke();
                ctx.fillStyle = "white";
                ctx.font = "25px Arial";



                ctx.fillText("Game Over" ,192, 190);
                ctx.font = "15px Arial";
                ctx.fillText("Press ENTER for new game" ,171,220);
                //----------------------------------------------------------------------------
                //if (this.dots.points > (this.bestResults[9].score/10)) {
                    ctx.fillText('Records', 215, 265);
                    ctx.fillText('Name', 155, 290);
                    ctx.fillText('Score' , 250, 290);
                    ctx.fillText('Date' , 305, 290);

                    var pos = 315;
                    this.bestResults.forEach(player => {
                        ctx.fillText(player.name , 155, pos);
                        ctx.fillText(player.score , 250, pos);

                        var date = new Date(player.date);
                        const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date);
                        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

                        ctx.fillText(`${da}-${mo}-${ye}` , 305, pos);
                        pos = pos + 20;
                    });
                //}
                //----------------------------------------------------------------------------
            }

            this.context.clearRect(205, 42, 110, 115);
            this.points.draw(this.dots.points);

            if (this.points.life !== 3) {
                this.counterWhenLifeIsLost++;
            }
        } else {
            this.counterWhenLifeIsLost = 0;
        }
    }
}