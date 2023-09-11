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
    speedX = 0;
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
        this.position.x += this.velocity.x + this.speedX;

        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            // add gravity every frame
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }

        console.log(this.velocity.y);

        // if input is pressed
        if (input.isPressed(Key.Space) || input.isPressed(Key.W)) {
            this.jump();
        }

        if (input.isPressed(Key.D)) {
            this.speedX += .1;
        }
        else if (input.isPressed(Key.A)) {
            this.speedX -= .1;
        }

        if (!input.isPressed(Key.D) && !input.isPressed(Key.A)) {
            this.speedX = 0;
        }


    }

    jump(factor: number = 3) {
        this.velocity.y = -factor;
    }
}