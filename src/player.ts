import { GameObject } from "./game_object";
import { Key } from "./keyboard_manager";
import { vec2 } from "./vec2";

export class Player extends GameObject {
    width = 30;
    height = 30;
    velocity: vec2 = {
        x: 0,
        y: 1
    };
    gravity = .15;
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

    get isMidAir() {
        return this.velocity.y != 0;
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            // add gravity every frame
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }

        // if input is pressed
        if (input.isPressed(Key.Space) || input.isPressed(Key.W)) {
            // if player is not mid air
            if (!this.isMidAir){
                this.jump();
            }
        }

        if (input.isPressed(Key.A)) {
            this.moveLeft();
        }

        if (input.isPressed(Key.D)) {
            this.moveRight();
        }

        if (!input.isPressed(Key.A) && !input.isPressed(Key.D)) {
            // if no input is pressed, stop player from moving horizontally
            this.velocity.x = 0;
        }
        

        // add friction and clamp velocity
        this.velocity.x = Math.max(-5, Math.min(5, this.velocity.x * .9));
        console.log(this.velocity.x);
    }

    moveLeft() {
        this.velocity.x -= 1;
    }

    moveRight() {
        this.velocity.x += 1;
    }

    jump(factor: number = 8) {
        this.velocity.y -= factor;
    }
}