import { GameObject } from "./game_object";
import { Key } from "./keyboard_manager";
import { Platform } from "./platform";
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
            x: canvas.width - 100,
            y: canvas.height - 100,
        };
    }

    private draw() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    get isMidAir() {
        // @ts-ignore
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
            // if player is not mid air OR its y velocity is exactly equal to its gravity (which happens because as collision sets y to 0, gravity still gets added for that 1 frame but will be set 0 during next loop)
            if (!this.isMidAir || this.velocity.y == this.gravity) {
                this.jump();
            }
        }

        if (input.isPressed(Key.A) && this.position.x > 50) {
            this.moveLeft();
        }
        else if (input.isPressed(Key.D) && this.position.x < this.canvas.width - 50) {
            this.moveRight();
        }
        else {
            // if no input is pressed, stop player from moving horizontally
            this.velocity.x = 0;

            // move all platforms if player has hit the edges
            gameObjects.forEach(obj => {
                if (obj instanceof Platform) {
                    let platform = obj as Platform;

                    if (input.isPressed(Key.A)) {
                        platform.position.x+= 2;
                    } else if (input.isPressed(Key.D)) {
                        platform.position.x-= 2;
                    }
                }
            });
        }


        // add friction and clamp velocity
        this.velocity.x = Math.max(-5, Math.min(5, this.velocity.x * .9));
        console.log("From Player", this.velocity);
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