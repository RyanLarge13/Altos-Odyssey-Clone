export const WIDTH = 1000;
export const HEIGHT = 500;
export const GAME_SPEED = 0;
export const GAME_VELOCITY = 0;

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
    { x: 0, y: 330 },
    { x: 100, y: 330 },
    { x: 200, y: 330 },
    { x: 300, y: 330 },
    { x: 400, y: 330 },
    { x: 500, y: 330 },
    { x: 600, y: 330 },
    { x: 700, y: 330 },
    { x: 800, y: 330 },
    { x: 900, y: 330 },
    { x: 1000, y: 330 },
    { x: 1100, y: 330 },
    { x: 1200, y: 330 },
    { x: 1300, y: 330 },
    { x: 1400, y: 340 },
    { x: 1500, y: 380 },
    { x: 1600, y: 400 },
    { x: 1700, y: 420 },
    { x: 1800, y: 455 },
    { x: 1900, y: 460 },
    { x: 2000, y: 460 },
    { x: 2100, y: 450 },
    { x: 2200, y: 420 },
    { x: 2300, y: 400 },
    { x: 2400, y: 380 },
    { x: 2500, y: 360 },
    { x: 2600, y: 350 },
    { x: 2700, y: 340 },
    { x: 2800, y: 330 },
    { x: 2900, y: 330 },
  ],
];
