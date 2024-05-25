import Animation from "./scripts/animations.js";
import { HEIGHT, WIDTH, srcs } from "./constants.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animations = {};

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

const keys = Object.keys(animations);

const update = (ani, newSpeed, newVelocity) => {
  ani.move(newSpeed, newVelocity);
};

const animate = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < keys.length; i++) {
    const ani = animations[keys[i]];
    ctx.drawImage(ani.img, ani.offsetXY.x, ani.offsetXY.y);
    switch (keys[i]) {
      case "bg1":
        update(ani, { x: 0.1, y: 0 }, { x: -1, y: 0 });
        break;
      case "bg2":
        update(ani, { x: 0.2, y: 0 }, { x: -1, y: 0 });
        break;
      case "bg3":
        update(ani, { x: 0.5, y: 0 }, { x: -1, y: 0 });
        break;
      case "sun":
        update(ani, { x: 0.001, y: 0.01 }, { x: 1, y: -1 });
        break;
      default:
        null;
    }
  }
  requestAnimationFrame(animate);
};

animate();
