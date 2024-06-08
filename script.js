import Animation from "./scripts/animations.js";
import Dune from "./scripts/dunes.js";
import HeightMap from "./scripts/heightMaps.js";
import { HEIGHT, WIDTH, srcs } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const MIN_DUNE_Y = 330;
const GRAVITY = 0.05;
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
let PREV_Y_DUNE = null;
let PREV_Y_PLAYER = null;
let ANGLE = 0;
let DID_LIFT = false;

const handleKeyDown = (e) => {
  const key = e.key;
  if (key === "ArrowUp") {
    if (!IS_JUMPING) {
      IS_JUMPING = true;
      SET_ANGLE = false;
      PLAYER_Y_VELOCITY = -2;
      DUNE_Y_VELOCITY = 2;
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

const heightMap1 = new HeightMap();
const newMap = heightMap1.generateSmoothHeightMap(20000, 300, 60, 50);
const dune1 = new Dune(newMap, 10);
const dunePoints = dune1.generateCubicBezierPoints();
dunes.push(dunePoints);

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

const calcY = (points, targetX) => {
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i].x <= targetX && points[i + 1].x > targetX) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const t = (targetX - p0.x) / (p1.x - p0.x);
      const y = Math.round(p0.y + t * (p1.y - p0.y) - DUNE_Y);
      return { y: y, x: points[i].x };
    }
  }
  return null;
};

const checkIfFalling = () => {
  const deltaDune = DUNE_Y - PREV_Y_DUNE;
  const deltaPlayer = PLAYER_Y - PREV_Y_PLAYER;
  let duneUp;
  let playerDown;
  if (deltaDune < 0) {
    duneUp = false;
  }
  if (deltaDune >= 0) {
    duneUp = true;
  }
  if (deltaPlayer < 0) {
    playerDown = false;
  }
  if (deltaPlayer >= 0) {
    playerDown = true;
  }
  return { playerDown: playerDown, duneUp: duneUp };
};

const checkLanding = (perfectY) => {
  let playerEnd = false;
  let duneEnd = false;
  if (perfectY <= 0) {
    duneEnd = true;
  }
  if (PLAYER_Y >= HEIGHT - (200 - 15)) {
    playerEnd = true;
  }
  return { playerEnd: playerEnd, duneEnd: duneEnd };
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
  const mid = calcY(points, DUNE_X + 218.5);
  if (SET_ANGLE) {
    const start = calcY(points, DUNE_X + 195);
    const end = calcY(points, DUNE_X + 225);
    const d = end.x - start.x;
    const h = end.y - start.y;
    ANGLE_RADIANS = Math.atan2(h, d);
    ANGLE = ANGLE_RADIANS * (180 / Math.PI);
  }
  const perfectY = mid.y - (MIN_DUNE_Y - 1);
  if (!PREV_Y_DUNE) {
    PREV_Y_DUNE = DUNE_Y;
  }
  if (!PREV_Y_PLAYER) {
    PREV_Y_PLAYER = PLAYER_Y;
  }
  DUNE_X += DUNE_SPEED_X * GAME_VELOCITY;
  if (!IS_JUMPING) {
    DUNE_Y += perfectY;
    if (perfectY >= 0) {
      if (DUNE_SPEED_X < 12) {
        DUNE_SPEED_X += 0.1;
      }
    }
    if (perfectY <= 0) {
      if (DUNE_SPEED_X > 5) {
        DUNE_SPEED_X -= 0.05;
      }
    }
  }
  if (IS_JUMPING) {
    DUNE_Y += -DUNE_Y_VELOCITY;
    DUNE_Y_VELOCITY -= GRAVITY;
    if (ANGLE < 0 && !DID_LIFT) {
      PLAYER_Y_VELOCITY += ANGLE / 10;
      DID_LIFT = true;
    }
    PLAYER_Y += PLAYER_Y_VELOCITY;
    PLAYER_Y_VELOCITY += GRAVITY;
    const { playerDown, duneUp } = checkIfFalling();
    if (perfectY <= 0) {
      DUNE_Y += perfectY;
    }
    if (PLAYER_Y >= HEIGHT - (200 - 15)) {
      PLAYER_Y = HEIGHT - (200 - 15);
    }
    if (playerDown && duneUp) {
      const { playerEnd, duneEnd } = checkLanding(perfectY);
      if (duneEnd && playerEnd) {
        IS_JUMPING = false;
        SET_ANGLE = true;
        DUNE_Y += perfectY;
        PLAYER_Y = HEIGHT - (200 - 15);
        DUNE_Y_VELOCITY = 0;
        PLAYER_Y_VELOCITY = 0;
        DID_LIFT = false;
      }
      // DUNE_SPEED_X <= 5 ? (DUNE_SPEED_X += 0.01) : null;
      if (duneEnd && !playerEnd) {
        DUNE_Y_VELOCITY = 0;
        DUNE_Y += perfectY;
      }
      if (playerEnd && !duneEnd) {
        PLAYER_Y = HEIGHT - (200 - 15);
        PLAYER_Y_VELOCITY = 0;
        DUNE_Y_VELOCITY >= -15 ? (DUNE_Y_VELOCITY -= 0.5) : null;
      }
    }
    PREV_Y_DUNE = DUNE_Y;
    PREV_Y_PLAYER = PLAYER_Y;
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
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
