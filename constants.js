const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

export const srcs = [
  {
    name: "sky",
    src: "/images/sky.png",
    initializedOffset: { x: 0, y: HEIGHT * 0.6 },
    translation: { x: false, y: true },
  },
  {
    name: "sun",
    src: "/images/sun.png",
    initializedOffset: { x: WIDTH / 4, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "clouds-back",
    src: "/images/clouds-back.png",
    initializedOffset: { x: 0, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "clouds-front",
    src: "/images/clouds-front.png",
    initializedOffset: { x: 0, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "bg1",
    src: "/images/bg-1.png",
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "bg2",
    src: "/images/bg-2.png",
    initializedOffset: { x: 0, y: HEIGHT + 50 },
    translation: { x: false, y: true },
  },
  {
    name: "bg3",
    src: "/images/bg-3.png",
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "boarder",
    src: "/images/boarder.png",
    initializedOffset: { x: 200, y: HEIGHT - 200 },
    translation: { x: false, y: false },
  },
];
