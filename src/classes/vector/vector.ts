import p5 from "p5";
import vectorImage from "./Vector.png";

type ColorPalette = string[];

let count = 0;
export default class VectorResource {
  _p5: p5;
  palette: ColorPalette;
  image: p5.Image;

  constructor(p5: p5, colorPalate: ColorPalette) {
    this._p5 = p5;
    this.palette = colorPalate;
    this._p5.translate(this._p5.width / 2, this._p5.height / 2);
    this._p5.imageMode(this._p5.CENTER);
    this.image = this._p5.loadImage(vectorImage, (img) => {
      this._p5.push();
      const x = count + 360;
      this._p5.image(img, x, 0, 600, 600);
    });
  }

  move(step: number) {
    this.image.set(step, step, 255);
  }
}
