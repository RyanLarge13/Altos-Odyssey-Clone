import Animation from "./scripts/animations.js";
import Dune from "./scripts/dunes.js";
import HeightMap from "./scripts/heightMaps.js";
import { srcs } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keyStates = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowLeft: false,
};
let HEIGHT = window.innerHeight;
let WIDTH = window.innerWidth;
let animations = {};
let dunes = [];
let heightMaps = [];
let minSearch = 2020;
let DUNE_X = 0;
let DUNE_Y = 0;
let DUNE_SPEED_X = 7;
let DUNE_Y_VELOCITY = 0;
let CONTACT_POINT = HEIGHT - 150;
let PLAYER_Y = CONTACT_POINT;
let IS_JUMPING = false;
let SET_ANGLE = true;
let ANGLE_RADIANS = 0;
let DUNE_ITERATION = 1;

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.height = height;
  canvas.width = width;
  HEIGHT = height;
  WIDTH = width;
};
resize();

const handleKeyDown = (e) => {
  const key = e.key;
  if (key === "ArrowUp") {
    if (!IS_JUMPING) {
      IS_JUMPING = true;
      SET_ANGLE = false;
      DUNE_Y_VELOCITY = -0.1;
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

// Max difference
// AMP: -1000 - 750
// FREQ: -100 - 150

let prevAmp = 150;
let prevFreq = 15;

const generateNextMap = (startX) => {
  const heightMap1 = new HeightMap();
  const newMap = heightMap1.generateSmoothHeightMap(
    startX,
    5000,
    prevAmp,
    prevFreq,
    0,
    0
  );
  prevAmp = newMap.params.amplitude;
  prevFreq = newMap.params.frequency;
  const newDune = new Dune(newMap.map, 10);
  heightMaps.push(newMap.map);
  const dunePoints = newDune.generateCubicBezierPoints();
  return dunePoints;
};

const newDune = generateNextMap(0);
dunes.push(newDune);

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

let isEnd = false;
let length = dunes[0].length - 2;

const checkEnd = (points) => {
  if (points[points.length - 2].x - DUNE_X <= WIDTH && !isEnd) {
    const newDune = generateNextMap(5000 * DUNE_ITERATION);
    DUNE_ITERATION++;
    dunes[0].splice(dunes[0].length, 0, ...newDune);
    isEnd = true;
  }
  if (points[length].x - DUNE_X < 0 && isEnd) {
    console.log(length);
    dunes[0].splice(0, length);
    minSearch = 0;
    isEnd = false;
  }
};

const findCoords = (points, target) => {
  let h = 0;
  let d = 0;
  let y = 0;
  for (let i = minSearch; i < minSearch + target; i++) {
    if (points[i].x <= target && points[i + 1].x > target) {
      minSearch = i;
      const startX = points[i - 80].x;
      const endX = points[i + 80].x;
      const startY = points[i - 80].y;
      const endY = points[i + 80].y;
      h = endY - startY;
      d = endX - startX;
      y = points[i].y;
      return { h, d, y };
    }
  }
  return { h, d, y };
};

// const colliding = (a, b) => Math.abs(a - b) <= 5;

const animateDunes = () => {
  const points = dunes[0];
  checkEnd(points);
  ctx.moveTo(points[0].x - DUNE_X, points[0].y - DUNE_Y);
  ctx.beginPath();
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x - DUNE_X, points[i].y - DUNE_Y);
  }
  ctx.lineTo(points[points.length - 1].x - DUNE_X, HEIGHT + DUNE_Y);
  ctx.lineTo(0, HEIGHT);
  ctx.closePath();
  ctx.fillStyle = "#be7128";
  ctx.fill();
  const targetX = 150 + DUNE_X + DUNE_SPEED_X;
  const { h, d, y } = findCoords(points, targetX);
  DUNE_Y = y - CONTACT_POINT - 7.5;
  ANGLE_RADIANS = Math.atan2(h, d);
  DUNE_X += DUNE_SPEED_X;
  if (ANGLE_RADIANS * 10 >= 1.5 && DUNE_SPEED_X < 10) {
    DUNE_SPEED_X += 0.01;
  }
  if (ANGLE_RADIANS * 10 < 1.5 && DUNE_SPEED_X > 5) {
    DUNE_SPEED_X -= 0.01;
  }
  const boarder = animations["boarder"];
  ctx.save();
  ctx.translate(150, PLAYER_Y);
  ctx.rotate(ANGLE_RADIANS);
  ctx.drawImage(
    boarder.img,
    -(boarder.img.width / 2 - 7.5),
    -(boarder.img.height / 2 - 7.5),
    15,
    15
  );
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
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2 + 58, ani.offsetXY.y);
        update(ani, { x: 0.1, y: 0 }, { x: -1, y: 0 });
        break;
      case "bg2":
        ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH * 2 + 60, ani.offsetXY.y);
        update(ani, { x: 0.2, y: 0 }, { x: -1, y: 0 });
        break;
      case "bg3":
        // ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH, ani.offsetXY.y);
        update(ani, { x: 0.5, y: 0 }, { x: -1, y: 0 });
        break;
      case "mt1":
        // ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH, ani.offsetXY.y);
        update(ani, { x: 0.3, y: 0 }, { x: -1, y: 0 });
        break;
      case "mt2":
        // ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH, ani.offsetXY.y);
        update(ani, { x: 0.2, y: 0 }, { x: -1, y: 0 });
        break;
      case "mt3":
        // ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH, ani.offsetXY.y);
        update(ani, { x: 0.7, y: 0 }, { x: -1, y: 0 });
        break;
      case "r1":
        // ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH, ani.offsetXY.y);
        update(ani, { x: 0.3, y: 0 }, { x: -1, y: 0 });
        break;
      case "r2":
        // ctx.drawImage(ani.img, ani.offsetXY.x + WIDTH, ani.offsetXY.y);
        update(ani, { x: 0.4, y: 0 }, { x: -1, y: 0 });
        break;
      case "sun":
        update(ani, { x: 0.001, y: 0.01 }, { x: 1, y: -1 });
        break;
      default:
        null;
    }
  }
  if (keyStates["ArrowLeft"] && IS_JUMPING && !SET_ANGLE) {
    ANGLE_RADIANS -= 0.05;
  }
  if (keyStates["ArrowRight"] && IS_JUMPING && !SET_ANGLE) {
    ANGLE_RADIANS += 0.05;
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
window.addEventListener("resize", resize);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
