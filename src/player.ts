import { GameObject } from "./game_object";
import { Key } from "./keyboard_manager";
import { vec2 } from "./vec2";

export class Player extends GameObject {
    width = 30;
    height = 30;
    velocity: vec2 = {
        x: 0,
        y: 0
    };
    gravity = .05;
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.position = {
            x: 100,
            y: 100
        };
    }

    private draw() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            // add gravity every frame
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }

        console.log(this.velocity.y);

        // if input is pressed
        if(globalThis.input.isPressed(Key.Space)){
            this.jump();
        }
    }

    jump(factor : number = 3){
        this.velocity.y = -factor;
    }
}