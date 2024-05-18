const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 1000;
const HEIGHT = 500;

const boarder = new Image();
const bg1 = new Image();
const bg2 = new Image();
const sun = new Image();
const clouds = new Image();

let rocksX = 0;
let mountainX = 0;
let mountainX2 = 0;
let speed = 15;

const radians = Math.atan(2000 / 8000);
const angle = radians * (180 / Math.PI);
const maxHeight = HEIGHT - 200;
const imageSources = {
  boarder: "./images/boarder.png",
  bg1: "./images/bg-1.png",
  bg2: "./images/bg-2.png",
  sun: "./images/sun.png",
  frontMt: "./images/bg-3.png",
  dun1: "./images/dune-3.png",
};

const loadImage = (src) => {
  return new Promise((res, rej) => {
    const newImg = new Image();
    newImg.src = src;
    newImg.onload = () => res(newImg);
    newImg.onerror = rej;
  });
};

const loadAllImages = async (srcs) => {
  const promises = Object.values(srcs).map(loadImage);
  try {
    const images = await Promise.all(promises);
    return images;
  } catch (err) {
    console.log(err);
  }
};

const images = await loadAllImages(imageSources);

let sunYX = { y: -50, x: WIDTH / 2 - images[3].width / 2 };
let dune = { y: images[5].height / 7, x: 0 };

const update = () => {
  const dx = Math.cos(angle * (Math.PI / 180)) * speed;
  const dy = Math.sin(angle * (Math.PI / 180)) * speed;
  if (rocksX <= -1000) {
    rocksX = 0;
  }
  if (mountainX <= -1000) {
    mountainX = 0;
  }
  if (mountainX2 <= -1000) {
    mountainX2 = 0;
  }
  if (dune.x + images[5].width <= -1000) {
    dune.x = 0;
    dune.y = images[5].height / 7;
  }
  rocksX -= 0.1;
  mountainX -= 0.2;
  mountainX2 -= 0.7;
  sunYX.y -= 0.01;
  sunYX.x += 0.01;
  dune.x -= dx;
  dune.y -= dy;
};

const animate = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(images[3], sunYX.x, sunYX.y);
  ctx.drawImage(images[2], rocksX, HEIGHT - images[2].height - 50);
  ctx.drawImage(images[1], mountainX, HEIGHT - images[1].height + 50);
  ctx.drawImage(images[4], mountainX2, HEIGHT - images[4].height);
  ctx.drawImage(images[0], 200, HEIGHT - 200, 30, 30);
  ctx.drawImage(images[5], dune.x, dune.y);
  update();
  requestAnimationFrame(animate);
};

if (images) {
  animate();
}
