class Animation {
  constructor(imgSrc, offsetXY) {
    this.imgSrc = imgSrc;
    this.img = null;
    this.offsetXY = { ...offsetXY };
    this.initialXOffset = offsetXY.x;
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
  move(newSpeed, newVelocity) {
    this.offsetXY.x += newSpeed.x * newVelocity.x;
    this.offsetXY.y += newSpeed.y * newVelocity.y;
    if (this.offsetXY.x <= -this.imgWidth) {
      this.offsetXY.x = this.initialXOffset;
    }
  }
  get imageWidth() {
    return this.imgWidth;
  }
  get imageHeight() {
    return this.imageHeight;
  }
}

export default Animation;
