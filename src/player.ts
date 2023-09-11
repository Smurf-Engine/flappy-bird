import { GameObject } from "./game_object";

export class Player extends GameObject {
    width = 30;
    height = 30;
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);

        this.position = {
            x: 100,
            y: 100
        };
    }

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}