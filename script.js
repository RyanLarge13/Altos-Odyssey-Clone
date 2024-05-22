import Dunes from "./dunes.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 1000;
const HEIGHT = 500;

const dunes = new Dunes();

let rocksX = 0;
let mountainX = 0;
let mountainX2 = 0;
let duneOffset = 0;
let duneY = 330;

const imageSources = {
  boarder: "./images/boarder.png",
  bg1: "./images/bg-1.png",
  bg2: "./images/bg-2.png",
  sun: "./images/sun.png",
  frontMt: "./images/bg-3.png",
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

const update = () => {
  if (rocksX <= -1000) {
    rocksX = 0;
  }
  if (mountainX <= -1000) {
    mountainX = 0;
  }
  if (mountainX2 <= -1000) {
    mountainX2 = 0;
  }
  rocksX -= 0.1;
  mountainX -= 0.2;
  mountainX2 -= 0.7;
  sunYX.y -= 0.01;
  sunYX.x += 0.01;
};

const drawDunes = () => {
  const heightMap = dunes.getHeightMap();
  if (heightMap.length < 2) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(heightMap[0].x - duneOffset, heightMap[0].y);
  for (let i = 1; i < heightMap.length - 1; i++) {
    ctx.quadraticCurveTo(
      heightMap[i].x - duneOffset,
      heightMap[i].y,
      (heightMap[i].x - duneOffset + heightMap[i + 1].x - duneOffset) / 2,
      (heightMap[i].y + heightMap[i + 1].y) / 2
    );
  }
  ctx.closePath();
  ctx.fillStyle = "#be9128";
  ctx.fill();
  duneOffset += 5;
};

const animate = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(images[3], sunYX.x, sunYX.y);
  ctx.drawImage(images[2], rocksX, HEIGHT - images[2].height - 50);
  ctx.drawImage(images[1], mountainX, HEIGHT - images[1].height + 50);
  ctx.drawImage(images[4], mountainX2, HEIGHT - images[4].height);
  ctx.drawImage(images[0], 200, HEIGHT - 200, 30, 30);
  drawDunes();
  update();
  requestAnimationFrame(animate);
};

if (images) {
  animate();
}
