class Animation {
  constructor(imgSrc, offsetXY, speed) {
    this.imgSrc = imgSrc;
    this.img = null;
    this.offsetXY = offsetXY;
    this.speed = speed;
    this.imgHeight = 0;
    this.imgWidth = 0;
  }
  initialize(translation) {
    return new Promise((res, rej) => {
      const newImg = new Image();
      newImg.src = this.imgSrc;
      newImg.onload = () => {
        this.img = newImg;
        this.imgHeight = newImg.height;
        this.imgWidth = newImg.width;
        if (translation.x) {
          this.offsetXY.x -= this.imgWidth;
        }
        if (translation.y) {
          this.offsetXY.y -= this.imgHeight;
        }
        res();
      };
      newImg.onerror = (err) => {
        rej(err);
      };
    });
  }
  move(x, y) {
    this.offsetXY = {
      x: (x + this.offsetXY.x) * this.speed,
      y: (y + this.offsetXY.y) * this.speed,
    };
  }
  setSpeed(value) {
    this.speed = value;
  }
  offset() {
    return this.offsetXY;
  }
}

export default Animation;
