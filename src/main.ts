import { GameObject } from './game_object';
import { Input } from './keyboard_manager';
import { Platform } from './platform';
import { Player } from './player';
import './style.css'

// setup canvas
const canvas = document.querySelector("canvas")!;
canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext("2d")!;
const gameObjects: GameObject[] = [];

const player = new Player(canvas);
gameObjects.push(player);

gameObjects.push(new Platform(canvas, {
  x: 100,
  y: 100,
}), new Platform(canvas, {
  x: 200,
  y: 200,
}), new Platform(canvas, {
  x: 300,
  y: 300,
},));

// sort all gameobjects (desc) based on their zIndex
gameObjects.sort((a, b) => b.zIndex - a.zIndex);


declare global {
  var input: Input;
  var gameObjects: GameObject[];
}
globalThis.input = new Input();
globalThis.gameObjects = gameObjects;
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameObjects.forEach((go) => go.update());

  gameObjects.forEach(obj => {
    if (obj instanceof Platform) {
      let platform = obj as Platform;

      // platform collision detection
      if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0;
      }
      console.log("From Game Loop", player.velocity.y);
    }
  });
};

// @ts-ignore
window.player = player;

animate();