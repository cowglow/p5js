import p5 from "p5";

type ColorPalette = string[];

export default class VectorResource {
  _p5: p5;
  palette: ColorPalette;
  image: p5.Image;
  steps: number;
  alpha: number = 0;
  coords: number[] = [0, 0];

  constructor(p5: p5, colorPalate: ColorPalette, image: p5.Image) {
    this._p5 = p5;
    this.palette = colorPalate;
    this._p5.angleMode(p5.DEGREES);
    this._p5.imageMode(this._p5.CENTER);
    this.steps = 0;
    this.image = image;
  }

  moveTo(x: number, y: number) {
    this.image.reset();
    this.coords = [x, y];
    this._p5.image(this.image, x, y, this.image.width, this.image.height);
  }

  move(sizeX: number) {
    const randomSize = this._p5.random(sizeX + 1, sizeX * 0.25);
    this._p5.image(
      this.image,
      this._p5.mouseX,
      this._p5.mouseY,
      randomSize,
      randomSize
    );
  }

  center() {
    this._p5.image(
      this.image,
      this._p5.width / 2,
      this._p5.height / 2,
      this.image.width / 2,
      this.image.height / 2
    );
    this._p5.noLoop();
  }

  rotate(deg: number) {
    this.image.reset();
    this._p5.rotate(deg);
    const [x, y] = this.coords;
    this._p5.translate(x, y);
    this._p5.image(this.image, x, y, this.image.width, this.image.height);
  }
}
