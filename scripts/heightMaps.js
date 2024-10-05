class HeightMap {
  constructor() {}
  generateSmoothHeightMap(
    startX,
    length,
    amplitude,
    frequency,
    xIncrement,
    targetAmps,
    targetFreq
  ) {
    const heightMap = [];
    const ampStep = targetAmps / length;
    const freqStep = targetFreq / length;
    for (let x = startX; x <= startX + length; x += xIncrement) {
      amplitude += ampStep;
      frequency += freqStep;
      const y = amplitude * Math.sin((frequency * x) / length) + x / 2;
      heightMap.push({ x, y });
    }
    return { map: heightMap, params: { amplitude, frequency } };
  }
  generateComplexHeightMap(length, xIncrement) {
    const heightMap = [];
    for (let x = 0; x <= length; x += xIncrement) {
      const y1 = 50 * Math.sin((2 * Math.PI * x) / length);
      const y2 = 30 * Math.cos((4 * Math.PI * x) / length);
      const y = y1 + y2 + 300;
      heightMap.push({ x, y });
    }
    return heightMap;
  }
}

export default HeightMap;
