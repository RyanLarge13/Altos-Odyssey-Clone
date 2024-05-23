class Dunes {
  constructor() {
    this.lastPoints = null;
    this.heightMap = [];
    this.MIN_HEIGHT = 800;
    this.genHeightMap();
  }
  genHeightMap() {
    if (this.lastPoints === null) {
      const newPoints = [
        { x: 0, y: 330 },
        { x: 100, y: 350 },
        { x: 500, y: 320 },
        { x: 750, y: 100 },
        { x: 1000, y: 300 },
        { x: 1500, y: 50 },
        { x: 2000, y: 250 },
        { x: 3000, y: 300 },
        { x: 3500, y: 320 },
        { x: 4000, y: 310 },
        { x: 4001, y: 800 },
        { x: 0, y: 800 },
        { x: 0, y: 330 },
      ];
      this.heightMap = newPoints;
      this.lastPoints = newPoints[3];
      return;
    }
  }
  genCoordinates() {}
  getHeightMap() {
    return this.heightMap;
  }
}

export default Dunes;

// const drawDunes = () => {
//   const heightMap = dunes.getHeightMap();
//   if (heightMap.length < 2) {
//     return;
//   }
//   ctx.beginPath();
//   ctx.moveTo(heightMap[0].x - duneXOffset, heightMap[0].y);
//   for (let i = 1; i < heightMap.length - 4; i++) {
//     ctx.quadraticCurveTo(
//       heightMap[i].x - duneXOffset,
//       heightMap[i].y,
//       (heightMap[i].x - duneXOffset + heightMap[i + 1].x - duneXOffset) / 2,
//       (heightMap[i].y + heightMap[i + 1].y) / 2
//     );
//   }
//   for (let i = heightMap.length - 3; i < heightMap.length; i++) {
//     ctx.lineTo(heightMap[i].x - duneXOffset, heightMap[i].y);
//   }
//   ctx.closePath();
//   ctx.fillStyle = "#be9128";
//   ctx.fill();
//   duneXOffset += 5;
// };
