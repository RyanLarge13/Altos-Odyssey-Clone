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
    src: `${baseURL}/assets/images/foreground.svg`,
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "bg2",
    src: `${baseURL}/assets/images/forground2.svg`,
    initializedOffset: { x: 0, y: HEIGHT - 30 },
    translation: { x: false, y: true },
  },
  {
    name: "bg3",
    src: `${baseURL}/assets/images/forground3.svg`,
    initializedOffset: { x: 0, y: HEIGHT - 20 },
    translation: { x: false, y: true },
  },
  {
    name: "bg3",
    src: `${baseURL}/assets/images/forground3.svg`,
    initializedOffset: { x: 0, y: HEIGHT + 10 },
    translation: { x: false, y: true },
  },
  {
    name: "mt1",
    src: `${baseURL}/assets/images/mountain1.svg`,
    initializedOffset: { x: 300, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "mt2",
    src: `${baseURL}/assets/images/mountain2.svg`,
    initializedOffset: { x: 1000, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "mt3",
    src: `${baseURL}/assets/images/mountain3.svg`,
    initializedOffset: { x: 600, y: HEIGHT - 20 },
    translation: { x: false, y: true },
  },
  {
    name: "r1",
    src: `${baseURL}/assets/images/ruins-2.svg`,
    initializedOffset: { x: 550, y: HEIGHT + 5 },
    translation: { x: false, y: true },
  },
  {
    name: "r2",
    src: `${baseURL}/assets/images/ruins-250x250.svg`,
    initializedOffset: { x: 800, y: HEIGHT - 50 },
    translation: { x: false, y: true },
  },
  {
    name: "fog",
    src: `${baseURL}/assets/images/fog.svg`,
    initializedOffset: { x: 0, y: HEIGHT },
    translation: { x: false, y: true },
  },
  {
    name: "boarder",
    src: `${baseURL}/assets/images/boarder.png`,
    initializedOffset: { x: 200, y: HEIGHT - 150 },
    translation: { x: false, y: false },
  },
];
