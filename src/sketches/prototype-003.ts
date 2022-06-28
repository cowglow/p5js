import p5 from "p5";
import {
  bootstrapCanvas,
  defaultCanvasDimensions,
} from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";
import VectorResource from "../classes/vector/vector";

const palette = [
  "187, 233, 200",
  "67, 54, 80",
  "103, 185, 213",
  "253, 196, 78",
  "197, 81, 72",
];
// @ts-ignore
let vectorResource: VectorResource | undefined;
let color = palette[Math.floor(Math.random() * palette.length)];

export default (p: p5) => {
  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-003-" + Date.now() });

  p.setup = () => {
    const { canvasWidth, canvasHeight } = defaultCanvasDimensions;
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(`rgba(${color}, 0.65)`);
  };

  p.draw = () => {
    color = palette[Math.floor(Math.random() * palette.length)];
    if (p.mouseIsPressed) {
      let size = Math.floor(Math.random() * 80);
      const v1 = p.createVector(window.innerWidth / 2, window.innerHeight / 2);
      p.blendMode(p.LIGHTEST);
      p.line(v1.x, v1.y, p.mouseX, p.mouseY);
      p.fill(`rgba(${color}, 0.66)`);
      p.ellipse(p.mouseX, p.mouseY, size, size);
      p.stroke(color);
      p.blendMode(p.ADD);
      vectorResource = new VectorResource(p, palette);
    }
  };

};
