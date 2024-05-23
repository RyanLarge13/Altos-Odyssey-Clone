import Animation from "./scripts/animations.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 1000;
const HEIGHT = 500;

const imageSources = {
  boarder: "../images/boarder.png",
  bg1: "../images/bg-1.png",
  bg2: "../images/bg-2.png",
  sun: "../images/sun.png",
  frontMt: "../images/bg-3.png",
};

const sandBoarder = new Animation(
  imageSources.boarder,
  { x: 200, y: HEIGHT - 200 },
  0
);
const bg1 = new Animation(imageSources.bg1, { x: 0, y: HEIGHT }, 0);
const bg2 = new Animation(imageSources.bg2, { x: 0, y: HEIGHT }, 0);
const sun = new Animation(imageSources.sun, { x: WIDTH, y: 200 }, 0);
const bg3 = new Animation(imageSources.frontMt, { x: 0, y: HEIGHT }, 0);

try {
  await sandBoarder.initialize();
  await bg1.initialize({ x: false, y: true });
  await bg2.initialize({ x: false, y: true });
  await sun.initialize({ x: true, y: false });
  await bg3.initialize({ x: false, y: true });
} catch (err) {
  console.log(err);
}

const update = () => {};

const animate = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  update();
  requestAnimationFrame(animate);
};

animate();
