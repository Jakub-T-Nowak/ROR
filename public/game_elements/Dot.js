export default class Dot {
    x       //type: Int
    y       //type: Int
    visible // type: Boolean
    super   // type: Boolean

    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.visible = false;
        this.super = false;
    }
}