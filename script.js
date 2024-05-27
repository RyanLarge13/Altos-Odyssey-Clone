import Animation from "./scripts/animations.js";
import Dune from "./scripts/dunes.js";
import HeightMap from "./scripts/heightMaps.js";
import { HEIGHT, WIDTH, srcs, heightMaps } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animations = {};
let dunes = [];
let duneX = 0;
let duneY = 0;
const GRAVITY = 0.2;
const MIN_DUNE_Y = 327;
let DUNE_Y_VELOCITY = 0;
let DUNE_SPEED_X = 3;
let GAME_VELOCITY = 1;

for (let i = 0; i < srcs.length; i++) {
  const newAni = new Animation(srcs[i].src, srcs[i].initializedOffset);
  try {
    await newAni.initialize(srcs[i].translation);
  } catch (err) {
    console.log(`Error : ${err}`);
  }
  const name = srcs[i].name;
  animations[name] = newAni;
}

// for (let i = 0; i < heightMaps.length; i++) {
//   const dune = new Dune(heightMaps[i], 10);
//   const dunePoints = dune.generateCubicBezierPoints();
//   dunes.push(dunePoints);
// }

const heightMap1 = new HeightMap();
const newMap = heightMap1.generateSmoothHeightMap(10000, 200, 30, 200);
// const newMap1 = heightMap1.generateComplexHeightMap(4000, 1);
const dune1 = new Dune(newMap, 10);
const dunePoints = dune1.generateCubicBezierPoints();
dunes.push(dunePoints);

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

const calcY = (points) => {
  const targetX = duneX + 200;
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i].x <= targetX && points[i + 1].x > targetX) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const t = (targetX - p0.x) / (p1.x - p0.x);
      const y = Math.floor(p0.y + t * (p1.y - p0.y) - duneY);
      return y;
    }
  }
  return null;
};

const animateDunes = () => {
  const points = dunes[0];
  ctx.moveTo(points[0].x - duneX, points[0].y - duneY);
  ctx.beginPath();
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x - duneX, points[i].y - duneY);
  }
  ctx.lineTo(points[points.length - 1].x - duneX, 800);
  ctx.lineTo(0, 800);
  ctx.closePath();
  ctx.fillStyle = "#be9128";
  ctx.fill();
  const y = calcY(points);
  const perfectY = y - MIN_DUNE_Y;
  duneX += DUNE_SPEED_X * GAME_VELOCITY;
  if (perfectY >= 0) {
    duneY -= DUNE_Y_VELOCITY * GRAVITY;
    DUNE_Y_VELOCITY -= GRAVITY;
  }
  if (perfectY < 0) {
    duneY += perfectY;
    DUNE_Y_VELOCITY = 0;
  }
};

const animate = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < keys.length; i++) {
    const ani = animations[keys[i]];
    ctx.drawImage(ani.img, ani.offsetXY.x, ani.offsetXY.y);
    switch (keys[i]) {
      case "bg1":
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2, ani.offsetXY.y);
        update(ani, { x: 0.1, y: 0 }, { x: -1, y: 0 });
        break;
      case "bg2":
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2, ani.offsetXY.y);
        update(ani, { x: 0.2, y: 0 }, { x: -1, y: 0 });
        break;
      case "bg3":
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2, ani.offsetXY.y);
        update(ani, { x: 0.5, y: 0 }, { x: -1, y: 0 });
        break;
      case "sun":
        update(ani, { x: 0.001, y: 0.01 }, { x: 1, y: -1 });
        break;
      default:
        null;
    }
  }
  animateDunes();
  requestAnimationFrame(animate);
};

animate();
animateDunes();
