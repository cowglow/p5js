import p5 from "p5";
import vectorImage from "./Vector.png";

type ColorPalette = string[];

export default class VectorResource {
  _p5: p5;
  palette: ColorPalette;
  image: p5.Image;

  constructor(p5: p5, colorPalate: ColorPalette) {
    this._p5 = p5;
    this.palette = colorPalate;
    this._p5.imageMode(this._p5.CENTER);
    this.image = this._p5.loadImage(vectorImage, (img) => {
      this._p5.push();
      this._p5.image(img, this._p5.width / 2, this._p5.height / 2, 600, 600);
    });
  }

  move(step: number) {
    this.image.set(step, step, 255);
  }
}
