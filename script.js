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
let goingUp = 0;
const GRAVITY = 0.1;
const MIN_DUNE_Y = 330;
const MAX_DUNE_X = 10;
let DUNE_Y_VELOCITY = 1;
let DUNE_SPEED_X = 10;
let GAME_VELOCITY = 1;

const handleKeyDown = (e) => {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      console.log("arrow up");
      break;
  }
};

const handleKeyUp = (e) => {};

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
const newMap = heightMap1.generateSmoothHeightMap(20000, 200, 60, 200);
// const newMap1 = heightMap1.generateComplexHeightMap(4000, 1);
const dune1 = new Dune(newMap, 10);
const dunePoints = dune1.generateCubicBezierPoints();
dunes.push(dunePoints);

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

const calcY = (points) => {
  const targetX = duneX + (215 + DUNE_SPEED_X / 2);
  for (let i = 0; i < points.length - 15; i++) {
    if (points[i].x <= targetX && points[i + 1].x > targetX) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const t = (targetX - p0.x) / (p1.x - p0.x);
      const y = Math.floor(p0.y + t * (p1.y - p0.y) - duneY);
      // calculating values and index + 15 and + 30 where angle seems to be too much both positive and negative for rotating playing
      // const p0a = points[i + 15];
      // const p1a = points[i + 16];
      // const ta = (targetX + 30 - p0a.x) / (p1a.x - p0a.x);
      // const ya = Math.floor(p0a.y + ta * (p1a.y - p0a.y) - duneY);
      // calculating variables at index + 30 x + 16 all. angle seems to rotate close to exact
      const p0a = points[i];
      const p1a = points[i + 15];
      const ta = (targetX + 37.5 - p0a.x) / (p1a.x - p0a.x);
      const ya = Math.floor(p0a.y + ta * (p1a.y - p0a.y) - duneY);
      return {
        y: y,
        futureY: ya,
        futureX: points[i + 34].x,
      };
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
  const { y, futureX, futureY } = calcY(points);
  const d = futureX - (duneX + 180);
  const h = futureY - y;
  const angleRadians = Math.atan2(h, d);
  const angle = angleRadians * (180 / Math.PI);
  const perfectY = y - MIN_DUNE_Y;
  duneX += DUNE_SPEED_X * GAME_VELOCITY;
  if (perfectY > 0) {
    // player is going downhill / hills are moving up
    if (goingUp === 0) {
      console.log("going up while hill is tilting down");
      duneY += perfectY - DUNE_Y_VELOCITY * GRAVITY;
      DUNE_Y_VELOCITY += 0.5;
    }
    if (DUNE_SPEED_X < 10) {
      DUNE_SPEED_X += 0.1;
    }
  }
  if (perfectY <= 0) {
    duneY += perfectY + 1;
    DUNE_Y_VELOCITY = 1;
    // player is going up hill / hills are moving down
    if (DUNE_SPEED_X > 5) {
      // DUNE_SPEED_X -= 0.1;
    }
  }
  if (angle < 0) {
    // negative angle means player is tilted uphill
    goingUp = 1;
  }
  if (angle > 0) {
    // positive angle means player is going down hill
    goingUp = 0;
  }
  //test 1
  // const d = futureX - duneX + 200;
  // const h = futureY - y;
  //test 2
  // const d = futureX - (duneX + 180);
  // h ???
  // const h = futureY - (y - duneY);
  // const h = futureY - y;
  // const angleRadians = Math.atan2(h, d);
  const boarder = animations["boarder"];
  ctx.save();
  ctx.translate(210, HEIGHT - (200 - 15));
  // console.log(angleRadians);
  // weird rotate when test 1 h, d variables were uncommented?
  // ctx.rotate(angleRadians * 12);
  // closer angles with test 2 h, d variables. this is weird.
  // ctx.rotate(angleRadians / 1.3);
  // trying to get exact radians without magic numbers
  ctx.rotate(angleRadians);
  ctx.drawImage(boarder.img, -boarder.img.width / 2, -boarder.img.height / 2);
  // ctx.drawImage(boarder.img, 0, 0);
  ctx.restore();
  // rotate image
};

const animate = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < keys.length; i++) {
    const ani = animations[keys[i]];
    if (keys[i] === "boarder") {
      null;
    } else {
      ctx.drawImage(ani.img, ani.offsetXY.x, ani.offsetXY.y);
    }
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
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
