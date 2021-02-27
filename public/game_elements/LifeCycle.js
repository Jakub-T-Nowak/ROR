import Triangle from './Triangle.js';

export default class LifeCycle {
    ctx             //type: Object ? DOM ?
    circle;         //type: Circle
    rect;           //type: [] Rectangle
    triangles;      //type: [] Triangle
    dotsAndPoints;  //type: Dots
    clickedKey;     //type: Int
    movingElements; //type: [] Circle
    lives = 0;      //type: Int

    gameInterval
    counterWhenLifeIsLost; //type: Int
    flagForEnter;          //type: Int
    gameOverFlag = false

    constructor (ctx, circle, rect, triangles, dots, counterWhenLifeIsLost, flagForEnter, clickedKey) {
        this.ctx = ctx;
        this.circle = circle;
        this.rect = rect;
        this.triangles = triangles;
        this.dotsAndPoints = dots;
        this.counterWhenLifeIsLost = counterWhenLifeIsLost;
        this.flagForEnter = flagForEnter;
        this.clickedKey = clickedKey;
        this.movingElements = [this.circle, ...this.triangles];
    }

    setGameInterval (gameInterval) {
        this.gameInterval = gameInterval;
    }

    updateGameArea () {
        this.checkIfLieIsLost();

        if (this.counterWhenLifeIsLost._ === 0) {
            this.gameStep()
        }
        else {
            this.pause()   
        } 
    }

    checkIfLieIsLost () {  
        const check = this.triangles.some(triangle => {
            const Dx = Math.abs(this.circle.getX() - triangle.getX());
            const Dy = Math.abs(this.circle.getY() - triangle.getY());
            return Dx < 20 && Dy < 20 ? true : false
        });

        if (check) this.counterWhenLifeIsLost._++;
    }

    gameStep () {
        this.ctx.clearRect(0, 0, 520, 520);  
        this.rect.forEach(rectangle => rectangle.draw())
        this.movingElements.forEach(element => element.newPos(
            this.clickedKey._, this.circle.getParams(), this.dotsAndPoints.getPoints()
        ))
        this.dotsAndPoints.drawDots(this.circle.getXY());
        this.addThirdTriangle();
        this.movingElements.forEach(element => element.update())
        this._drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);
    }

    addThirdTriangle () {
        if (this.dotsAndPoints.getPoints() === 195 && this.triangles.length === 2) {
            this.triangles[2] = new Triangle(20, 500, this.rect[0], this.rect);
            this.movingElements.push(this.triangles[2]);
        }
    }

    pause () {
        this.checkForGameOver();

        if (this.gameOverFlag === true) {
            this.gameOver();
        }
        else {
            this.lostLife();
        }
    }

    checkForGameOver () {
        if (this.counterWhenLifeIsLost._ === 1) {
            this.gameOverFlag =  this.lives === 2 ? true : false;
        }
    }

    lostLife () {
        if (this.counterWhenLifeIsLost._ === 1) {
            this.lives++;
            this.flagForEnter._ = 2
            this.clickedKey._ = 0;
            this.movingElements.forEach(element => element.restartPosition())
            this._lostLifeWindow();
            this._drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);
            clearInterval(this.gameInterval);
            setTimeout(
                ()=>{
                    this.gameInterval = setInterval(() => {this.updateGameArea()}, 20)
                    this.counterWhenLifeIsLost.restart();
                    this.flagForEnter.activateNavigation();
                },2000)
        }
    }

    gameOver () {
        this.lives++;
        this.flagForEnter._ = 2
        this.clickedKey._ = 0;
        this.counterWhenLifeIsLost._++;
        this.movingElements.forEach(element => element.restartPosition())
        this._gameOverWindow();
        this._drawPointsAndLives(this.dotsAndPoints.getPoints(), this.lives);
    }

    restartGame () {
        this.counterWhenLifeIsLost.restart();
        this.flagForEnter.activateNavigation();
        this.dotsAndPoints.initiate();
        this.removeThirdTriangle();
        this.gameOverFlag = false;
        this.lives = 0;
    }

    removeThirdTriangle () {
        if (this.triangles.length === 3){
            this.triangles.pop();
            this.movingElements.pop();
        }
    }

    _lostLifeWindow() {
        var ctx = this.ctx;
        ctx.strokeStyle = "white";
        ctx.clearRect(150, 180, 220, 160);//(x,y,L,H)
        ctx.beginPath();
        ctx.rect(150,180,220,160);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("You lost life" ,190,265);
        ctx.clearRect(205, 42, 110, 115);
    }

    _gameOverWindow() {
        var ctx = this.ctx;
        ctx.strokeStyle = "white";
        ctx.clearRect(140, 20, 240, 480);//(x,y,L,H)
        ctx.beginPath();
        ctx.rect(140, 20, 240, 480);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("Game Over" ,192, 290);
        ctx.font = "15px Arial";
        ctx.fillText("Press ENTER for new game" ,171,320);
        ctx.clearRect(205, 42, 110, 115);
    }

    _drawPointsAndLives (points, lives) {
        //points     
        const ctx = this.ctx;
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("points: " + points + "0" ,210,144);
        
        //lives
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";

        if (lives === 1){
            ctx.fillText('4' ,232,70);
        }
        else if (lives === 2){
            ctx.fillText('4' ,232,70);
            ctx.fillText('0' ,252,70);
        }
        else if (lives === 3){
            ctx.fillText('4' ,232,70);
            ctx.fillText('0' ,252,70);
            ctx.fillText('4' ,272,70);
        }
    }
}