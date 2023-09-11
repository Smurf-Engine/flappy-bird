import { GameObject } from "./game_object";
import { vec2 } from "./vec2";

export class Player extends GameObject {
    width = 30;
    height = 30;
    velocity : vec2 = {
        x : 0,
        y : 0
    };
    gravity = .05;
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);

        this.position = {
            x: 100,
            y: 100
        };
    }

    private draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

    update(){
        this.draw();

        this.position.y += this.velocity.y;

        this.velocity.y += this.gravity;
    }
}