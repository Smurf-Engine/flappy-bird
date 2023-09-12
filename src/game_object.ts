import { vec2 } from "./vec2";

export abstract class GameObject {
    zIndex = 1;
    position: vec2 = {
        x: 0,
        y: 0
    };
    ctx : CanvasRenderingContext2D;
    constructor(public readonly canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!;
    }

    abstract update(): void;
}