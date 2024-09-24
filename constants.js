const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

export const srcs = [
  {
    name: "sky",
    src: "../assets/images/sky.png",
    initializedOffset: { x: 0, y: HEIGHT * 0.6 },
    translation: { x: false, y: true },
  },
  {
    name: "sun",
    src: "../assets/images/sun.png",
    initializedOffset: { x: WIDTH / 4, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "clouds-back",
    src: "../assets/images/clouds-back.png",
    initializedOffset: { x: 0, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "clouds-front",
    src: "../assets/images/clouds-front.png",
    initializedOffset: { x: 0, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "bg1",
    src: "../assets/images/bg-1.png",
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "bg2",
    src: "../assets/images/bg-2.png",
    initializedOffset: { x: 0, y: HEIGHT + 50 },
    translation: { x: false, y: true },
  },
  {
    name: "bg3",
    src: "../assets/images/bg-3.png",
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "boarder",
    src: "../assets/images/boarder.png",
    initializedOffset: { x: 200, y: HEIGHT - 200 },
    translation: { x: false, y: false },
  },
];
