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
    { x: 0, y: 330 },
    { x: 200, y: 330 },
    { x: 400, y: 330 },
    { x: 600, y: 330 },
    { x: 800, y: 330 },
    { x: 1000, y: 200 },
    { x: 1200, y: 200 },
    { x: 1400, y: 220 },
    { x: 1600, y: 420 },
    { x: 1800, y: 410 },
    { x: 2000, y: 410 },
    { x: 2200, y: 450 },
    { x: 2400, y: 490 },
    { x: 2600, y: 510 },
    { x: 2800, y: 460 },
    { x: 3000, y: 330 },
    { x: 3200, y: 330 },
    { x: 3400, y: 630 },
    { x: 3600, y: 630 },
    { x: 3800, y: 630 },
    { x: 4000, y: 630 },
    { x: 4200, y: 630 },
    { x: 4400, y: 630 },
    { x: 4600, y: 630 },
    { x: 4800, y: 630 },
    { x: 5000, y: 630 },
    { x: 5200, y: 630 },
    { x: 5400, y: 630 },
    { x: 5600, y: 630 },
    { x: 5800, y: 630 },
    { x: 6000, y: 630 },
  ],
];
