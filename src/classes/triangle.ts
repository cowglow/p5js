import p5 from "p5";

export default class Triangle {
  _p5: p5;
  p1: p5.Vector;
  p2: p5.Vector;
  p3: p5.Vector;

  constructor(p5: p5, p1: p5.Vector, p2: p5.Vector, p3: p5.Vector) {
    this._p5 = p5;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  draw(color: boolean) {
    this._p5.triangle(
      this.p1.x,
      this.p1.y,
      this.p2.x,
      this.p2.y,
      this.p3.x,
      this.p3.y
    );

    if (color) {
      this._p5.fill(
        Math.random() * 360,
        Math.random() * 100,
        Math.random() * 100
      );
    } else {
      this._p5.noFill();
    }
  }
}
