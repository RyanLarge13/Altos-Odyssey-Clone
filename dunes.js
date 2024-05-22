class Dunes {
  constructor() {
    this.lastPoints = null;
    this.heightMap = [];
    this.MINHEIGHT = 800;
    this.genHeightMap();
  }
  genHeightMap() {
    if (this.lastPoints === null) {
      const newPoints = [
        { x: 0, y: 330 },
        { x: 100, y: 350 },
        { x: 500, y: 320 },
        { x: 750, y: 700 },
        { x: 1000, y: 340 },
        { x: 1500, y: 330 },
        { x: 2000, y: 370 },
        { x: 3000, y: 350 },
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
