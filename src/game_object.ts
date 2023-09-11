import { vec2 } from "./vec2";

export class GameObject {
    position: vec2 = {
        x: 0,
        y: 0
    };
    constructor(public readonly ctx: CanvasRenderingContext2D) { }
}