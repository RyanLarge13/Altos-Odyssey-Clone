import Animation from "./scripts/animations.js";
import Dune from "./scripts/dunes.js";
import HeightMap from "./scripts/heightMaps.js";
import { HEIGHT, WIDTH, srcs, heightMaps } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const MIN_DUNE_Y = 330;
const GRAVITY = 0.1;
const keyStates = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowLeft: false,
};
let animations = {};
let dunes = [];
let GAME_VELOCITY = 1;
let DUNE_X = 0;
let DUNE_Y = 0;
let DUNE_SPEED_X = 10;
let DUNE_Y_VELOCITY = 0;
let PLAYER_Y_VELOCITY = 0;
let PLAYER_Y = HEIGHT - (200 - 15);
let IS_JUMPING = false;
let SET_ANGLE = true;
let ANGLE_RADIANS = 0;

const handleKeyDown = (e) => {
  const key = e.key;
  if (key === "ArrowUp") {
    if (!IS_JUMPING) {
      IS_JUMPING = true;
      SET_ANGLE = false;
      PLAYER_Y_VELOCITY = -4;
      DUNE_Y_VELOCITY = 4;
    }
    return;
  }
  keyStates[key] = true;
};

const handleKeyUp = (e) => {
  const key = e.key;
  keyStates[key] = false;
};

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
const newMap = heightMap1.generateSmoothHeightMap(20000, 200, 50, 100);
// const newMap1 = heightMap1.generateComplexHeightMap(4000, 1);
const dune1 = new Dune(newMap, 10);
const dunePoints = dune1.generateCubicBezierPoints();
dunes.push(dunePoints);

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

const calcY = (points) => {
  const targetX = DUNE_X + (215 + DUNE_SPEED_X / 2);
  for (let i = 0; i < points.length - 15; i++) {
    if (points[i].x <= targetX && points[i + 1].x > targetX) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const t = (targetX - p0.x) / (p1.x - p0.x);
      const y = Math.floor(p0.y + t * (p1.y - p0.y) - DUNE_Y);
      const p0a = points[i];
      const p1a = points[i + 15];
      const ta = (targetX + 45 - p0a.x) / (p1a.x - p0a.x);
      const ya = Math.floor(p0a.y + ta * (p1a.y - p0a.y) - DUNE_Y);
      return {
        y: y,
        futureY: ya,
        futureX: points[i + 45].x,
      };
    }
  }
  return null;
};

const animateDunes = () => {
  const points = dunes[0];
  ctx.moveTo(points[0].x - DUNE_X, points[0].y - DUNE_Y);
  ctx.beginPath();
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x - DUNE_X, points[i].y - DUNE_Y);
  }
  ctx.lineTo(points[points.length - 1].x - DUNE_X, 800);
  ctx.lineTo(0, 800);
  ctx.closePath();
  ctx.fillStyle = "#be9128";
  ctx.fill();
  const { y, futureX, futureY } = calcY(points);
  const d = futureX - (DUNE_X + 180);
  const h = futureY - y;
  if (SET_ANGLE) {
    ANGLE_RADIANS = Math.atan2(h, d);
  }
  // const angle = angleRadians * (180 / Math.PI);
  let perfectY = y - MIN_DUNE_Y;
  DUNE_X += DUNE_SPEED_X * GAME_VELOCITY;
  if (!IS_JUMPING) {
    DUNE_Y += perfectY + 1;
    if (perfectY > 0) {
      if (DUNE_SPEED_X < 10) {
        DUNE_SPEED_X += 0.2;
      }
    }
    if (perfectY <= 0) {
      if (DUNE_SPEED_X > 3) {
        DUNE_SPEED_X -= 0.1;
      }
    }
  }
  if (IS_JUMPING) {
    DUNE_Y += perfectY - DUNE_Y_VELOCITY;
    DUNE_Y_VELOCITY -= GRAVITY;
    PLAYER_Y += PLAYER_Y_VELOCITY;
    PLAYER_Y_VELOCITY += GRAVITY;
    if (Math.floor(PLAYER_Y) >= MIN_DUNE_Y - 15) {
      console.log(PLAYER_Y);
      IS_JUMPING = false;
      PLAYER_Y_VELOCITY = 0;
      DUNE_Y_VELOCITY = 0;
      DUNE_Y += perfectY;
      PLAYER_Y = HEIGHT - (200 - 15);
      SET_ANGLE = true;
    }
  }
  const boarder = animations["boarder"];
  ctx.save();
  ctx.translate(210, PLAYER_Y);
  ctx.rotate(ANGLE_RADIANS);
  ctx.drawImage(boarder.img, -boarder.img.width / 2, -boarder.img.height / 2);
  ctx.restore();
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
      case "clouds-back":
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2, ani.offsetXY.y);
        update(ani, { x: 0.01, y: 0 }, { x: -1, y: 0 });
        break;
      case "clouds-front":
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2, ani.offsetXY.y);
        update(ani, { x: 0.04, y: 0 }, { x: -1, y: 0 });
        break;
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
  if (keyStates["ArrowLeft"] && IS_JUMPING && !SET_ANGLE) {
    ANGLE_RADIANS -= 0.1;
  }
  if (keyStates["ArrowRight"] && IS_JUMPING && !SET_ANGLE) {
    ANGLE_RADIANS += 0.1;
  }
  if (
    !keyStates["ArrowRight"] &&
    !keyStates["ArrowLeft"] &&
    IS_JUMPING &&
    !SET_ANGLE
  ) {
    ANGLE_RADIANS += 0.005;
  }
  animateDunes();
  requestAnimationFrame(animate);
};

animate();
animateDunes();
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
