import { Player } from './player';
import './style.css'

// setup canvas
const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext("2d")!;

const player = new Player(ctx);
player.draw();