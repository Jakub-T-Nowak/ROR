import ObjectC from "./ObjectC.js";

//Points and Lives
export default class Points extends ObjectC {
    life = 0;

    draw (points) {
        //points     
        var ctx = Points.myGameArea;
        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("points: " + points + "0" ,210,144);
        
        //lives
        ctx.fillStyle = "white";
        ctx.font = "25px Arial";

        if (this.life === 1){
            ctx.fillText('4' ,232,70);
        }

        if (this.life === 2){
            ctx.fillText('4' ,232,70);
            ctx.fillText('0' ,252,70);
        }

        if (this.life === 3){
            ctx.fillText('4' ,232,70);
            ctx.fillText('0' ,252,70);
            ctx.fillText('4' ,272,70);
        }
    }
}