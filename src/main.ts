import { Input } from './keyboard_manager';
import { Player } from './player';
import './style.css'

// setup canvas
const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext("2d")!;

const player = new Player(canvas);
declare global {
  var input: Input;
}
globalThis.input = new Input();
const animate = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  player.update();
  requestAnimationFrame(animate);
};

// @ts-ignore
window.player = player;

animate();