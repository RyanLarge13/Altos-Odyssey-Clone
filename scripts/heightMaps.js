class HeightMap {
  constructor() {}
  generateSmoothHeightMap(length, amplitude, frequency, xIncrement) {
    const heightMap = [];
    for (let x = 0; x <= length; x += xIncrement) {
      const y = amplitude * Math.sin((frequency * x) / length) + x / 2;
      heightMap.push({ x, y });
    }
    return heightMap;
  }

  // Example usage
  // const length = 6000; // total length of the height map
  // const amplitude = 100; // amplitude of the sine wave
  // const frequency = 2 * Math.PI; // frequency of the sine wave
  // const xIncrement = 200; // consistent x increments

  // const heightMap = generateSmoothHeightMap(length, amplitude, frequency, xIncrement);

  generateComplexHeightMap(length, xIncrement) {
    const heightMap = [];
    for (let x = 0; x <= length; x += xIncrement) {
      const y1 = 50 * Math.sin((2 * Math.PI * x) / length);
      const y2 = 30 * Math.cos((4 * Math.PI * x) / length);
      const y = y1 + y2 + 300; // Combine waves and add a base y value
      heightMap.push({ x, y });
    }
    return heightMap;
  }

  // Example usage
  // const length = 6000;
  // const xIncrement = 200;

  // const complexHeightMap = generateComplexHeightMap(length, xIncrement);
}

export default HeightMap;
