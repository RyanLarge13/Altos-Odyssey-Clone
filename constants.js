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
    initializedOffset: { x: 0, y: HEIGHT },
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
