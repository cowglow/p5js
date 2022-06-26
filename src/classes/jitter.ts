import p5 from "p5";

export default class Jitter {
  _p5: p5;
  x: number;
  y: number;
  width: number = 100;
  height: number = 1000;
  diameter: number;
  speed: number;

  constructor(p5: p5, x: number, y: number) {
    this._p5 = p5;
    this.x = x;
    this.y = y;
    this.diameter = 10;
    this.speed = 35;
  }

  move() {
    // With mouse
    this.x = this._p5.mouseX;
    this.y = this._p5.mouseY;
    // Random
    this.x += this._p5.random(-this.speed, this.speed);
    this.y += this._p5.random(-this.speed, this.speed);
    this.diameter = this._p5.random(10, 100);
  }

  display() {
    this._p5.push();
    this._p5.noStroke();
    // this._p5.fill(this.y % 256, this.x % 256, 255, this.speed / 70);
    this._p5.fill(this.y % 256, this.x % 256, 255, this.speed / 70);
    this._p5.ellipse(this.x, this.y, this.diameter, this.diameter);
    this._p5.pop();
  }
}
