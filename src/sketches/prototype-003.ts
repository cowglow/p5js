import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import VectorResource from "../classes/vector/vector";

const palette = ["#bbe9c8", "#433650", "#67b9d5", "#fdc44e", "#c55148"];

let vectorResource: VectorResource | undefined;
let steps = 0;
let maxStep = 80;

export default (p: p5) => {
  bootstrapCanvas(p);

  p.draw = () => {
    const color = palette[Math.floor(Math.random() * palette.length)];
    p.fill(color);

    if (!vectorResource) {
      if (steps < maxStep) {
        vectorResource = new VectorResource(p, palette);
        vectorResource._p5.rotate(steps % 120);
        vectorResource.move(steps % 360)
        p.ellipse(p.random(0, 1000), p.random(0, 1000), 80, 80);
      }
    } else {
      vectorResource = undefined;
    }
    steps++;
  };
};
