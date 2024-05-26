export const WIDTH = 1000;
export const HEIGHT = 500;

export const srcs = [
  {
    name: "bg1",
    src: "../images/bg-1.png",
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "bg2",
    src: "../images/bg-2.png",
    initializedOffset: { x: 0, y: HEIGHT + 50 },
    translation: { x: false, y: true },
  },
  {
    name: "sun",
    src: "../images/sun.png",
    initializedOffset: { x: WIDTH / 4, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "bg3",
    src: "../images/bg-3.png",
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "boarder",
    src: "../images/boarder.png",
    initializedOffset: { x: 200, y: HEIGHT - 200 },
    translation: { x: false, y: false },
  },
];

export const heightMaps = [
  [
    { x: 0, y: 327 },
    { x: 200, y: 327 },
    { x: 400, y: 327 },
    { x: 600, y: 327 },
    { x: 800, y: 200 },
    { x: 1000, y: 180 },
    { x: 1100, y: 150 },
    { x: 1120, y: 160 },
    { x: 1300, y: 300 },
    { x: 1500, y: 500 },
    { x: 1600, y: 700 },
    { x: 1800, y: 327 },
    { x: 2000, y: 327 },
    { x: 2100, y: 327 },
    { x: 2150, y: 340 },
    { x: 2200, y: 380 },
    { x: 2250, y: 400 },
    { x: 2300, y: 420 },
    { x: 2400, y: 455 },
    { x: 2700, y: 460 },
    { x: 2900, y: 460 },
    { x: 3000, y: 450 },
    { x: 3200, y: 420 },
    { x: 3300, y: 400 },
    { x: 3400, y: 380 },
    { x: 3450, y: 360 },
    { x: 3500, y: 350 },
    { x: 3550, y: 340 },
    { x: 3600, y: 327 },
    { x: 3700, y: 327 },
    { x: 3800, y: 327 },
  ],
];
