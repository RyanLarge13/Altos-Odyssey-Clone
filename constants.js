const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const isProduction = window.location.hostname === "ryanlarge13.github.io";
const repoName = "/Altos-Odyssey-Clone";
const baseURL = isProduction ? `${window.location.origin}${repoName}` : "";

export const srcs = [
  {
    name: "sky",
    src: `${baseURL}/assets/images/sky.png`,
    initializedOffset: { x: 0, y: HEIGHT * 0.6 },
    translation: { x: false, y: true },
  },
  {
    name: "sun",
    src: `${baseURL}/assets/images/sun.png`,
    initializedOffset: { x: WIDTH / 4, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "clouds-back",
    src: `${baseURL}/assets/images/clouds-back.png`,
    initializedOffset: { x: 0, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "clouds-front",
    src: `${baseURL}/assets/images/clouds-front.png`,
    initializedOffset: { x: 0, y: 0 },
    translation: { x: false, y: false },
  },
  {
    name: "bg1",
    src: `${baseURL}/assets/images/bg-1.png`,
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "bg2",
    src: `${baseURL}/assets/images/bg-2.png`,
    initializedOffset: { x: 0, y: HEIGHT + 50 },
    translation: { x: false, y: true },
  },
  {
    name: "bg3",
    src: `${baseURL}/assets/images/bg-3.png`,
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "boarder",
    src: `${baseURL}/assets/images/boarder.png`,
    initializedOffset: { x: 200, y: HEIGHT - 200 },
    translation: { x: false, y: false },
  },
];
