import { GameObject } from "./game_object";
import { vec2 } from "./vec2";

export class Platform extends GameObject {
    width = 100;
    height = 20;
    constructor(public readonly canvas: HTMLCanvasElement, coords? : vec2, layerIndex? : number) {
        super(canvas);
        this.position = coords ?? {
            x : 100,
            y : 100
        };

        this.zIndex = layerIndex ?? this.zIndex;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.shadowColor = "white";
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        this.ctx.restore();
    }
    update(): void {
        this.draw();
    }
}