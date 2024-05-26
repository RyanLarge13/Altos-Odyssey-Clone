class Dune {
  constructor(heightMap, density) {
    this.heightMap = heightMap;
    this.density = density;
    this.points = [];
  }

  #interpolate(p0, p1, p2, p3, t) {
    const x =
      (1 - t) ** 3 * p0.x +
      3 * (1 - t) ** 2 * t * p1.x +
      3 * (1 - t) * t ** 2 * p2.x +
      t ** 3 * p3.x;
    const y =
      (1 - t) ** 3 * p0.y +
      3 * (1 - t) ** 2 * t * p1.y +
      3 * (1 - t) * t ** 2 * p2.y +
      t ** 3 * p3.y;
    return { x, y };
  }

  generateCubicBezierPoints() {
    let i;
    for (i = 0; i < this.heightMap.length - 3; i += 3) {
      const p0 = this.heightMap[i];
      const p1 = this.heightMap[i + 1];
      const p2 = this.heightMap[i + 2];
      const p3 = this.heightMap[i + 3];
      const numberOfPoints = (p3.x - p0.x) * this.density;
      for (let j = 0; j <= numberOfPoints; j++) {
        const t = j / numberOfPoints;
        const point = this.#interpolate(p0, p1, p2, p3, t);
        this.points.push(point);
      }
    }

    if (i < this.heightMap.length - 1) {
      for (let j = i; j < this.heightMap.length - 1; j++) {
        const p0 = this.heightMap[j];
        const p1 = this.heightMap[j + 1];
        const numberOfPoints = (p1.x - p0.x) * this.density;
        for (let k = 0; k <= numberOfPoints; k++) {
          const t = k / numberOfPoints;
          const x = p0.x + t * (p1.x - p0.x);
          const y = p0.y + t * (p1.y - p0.y);
          this.points.push({ x, y });
        }
      }
    }

    return this.points;
  }
}

export default Dune;
