import Animation from "./scripts/animations.js";
import Dune from "./scripts/dunes.js";
import HeightMap from "./scripts/heightMaps.js";
import { srcs } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.05;
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
let GAME_VELOCITY = 1;
let DUNE_X = 0;
let DUNE_Y = 0;
let DUNE_SPEED_X = 10;
let DUNE_Y_VELOCITY = 0;
let PLAYER_Y_VELOCITY = 0;
let CONTACT_POINT = HEIGHT - HEIGHT / 3;
let PLAYER_Y = CONTACT_POINT;
let IS_JUMPING = false;
let SET_ANGLE = true;
let ANGLE_RADIANS = 0;
let DUNE_ITERATION = 0;
let HEIGHT_MAP_ITERATION = 21;

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
      PLAYER_Y_VELOCITY = -0.5;
      DUNE_Y_VELOCITY = 0.5;
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

const generateNextMap = () => {
  const heightMap1 = new HeightMap();
  const newMap = heightMap1.generateSmoothHeightMap(20000, 300, 30, 10);
  const newDune = new Dune(newMap, 10);
  heightMaps.push(newMap);
  const dunePoints = newDune.generateCubicBezierPoints();
  return dunePoints;
};

const newDune = generateNextMap();
dunes.push(newDune);

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

const findCoords = (points, target) => {
  let h = 0;
  let d = 0;
  let y = 0;
  for (let i = minSearch; i < minSearch + target; i++) {
    if (points[i].x <= target && points[i + 1].x > target) {
      minSearch = i;
      const startX = points[i - 8].x;
      const endX = points[i + 8].x;
      const startY = points[i - 8].y;
      const endY = points[i + 8].y;
      h = endY - startY;
      d = endX - startX;
      y = points[i].y;
      return { h, d, y };
    }
  }
  return { h, d, y };
};

const animateDunes = () => {
  const points = dunes[DUNE_ITERATION];
  ctx.moveTo(points[0].x - DUNE_X, points[0].y - DUNE_Y);
  ctx.beginPath();
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x - DUNE_X, points[i].y - DUNE_Y);
  }
  ctx.lineTo(points[points.length - 1].x - DUNE_X, HEIGHT + DUNE_Y);
  ctx.lineTo(0, HEIGHT);
  ctx.closePath();
  ctx.fillStyle = "#be9128";
  ctx.fill();
  const { h, d, y } = findCoords(points, 210 + DUNE_X);
  let diff = y - CONTACT_POINT;
  const comp = DUNE_Y - diff;
  console.log(comp);
  ANGLE_RADIANS = Math.atan2(h, d);
  ctx.beginPath();
  ctx.arc(200, CONTACT_POINT, 3, 0, Math.PI * 2);
  ctx.strokeStyle = "blue";
  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.stroke();
  DUNE_X += DUNE_SPEED_X;
  DUNE_SPEED_X += 0.01;
  DUNE_Y = diff - comp / 5;
  const boarder = animations["boarder"];
  ctx.save();
  ctx.translate(200, PLAYER_Y);
  ctx.rotate(ANGLE_RADIANS);
  ctx.drawImage(
    boarder.img,
    -(boarder.img.width / 2 - 7.5),
    -(boarder.img.height / 2),
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
