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
  let imageResource: p5.Image;
  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-003-" + Date.now() });

  p.preload = () => {
    imageResource = p.loadImage(
      `${import.meta.env["BASE_URL"]}vector/Vector.png`
    );
  };

  p.setup = () => {
    const { canvasWidth, canvasHeight } = defaultCanvasDimensions;
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(`rgba(${color}, 0.65)`);
    p.angleMode(p.DEGREES);
    vectorResource = new VectorResource(p, palette, imageResource);
  };

  p.draw = () => {
    color = palette[Math.floor(Math.random() * palette.length)];

    if (p.mouseIsPressed) {
      let size = Math.floor(Math.random() * 80);
      const v1 = p.createVector(window.innerWidth / 2, window.innerHeight / 2);

      p.fill(`rgba(${color}, 0.4)`);
      p.stroke(`rgba(${color}, 0.4)`);
      p.ellipseMode(p.CENTER);

      p.line(v1.x, v1.y, p.mouseX, p.mouseY);
      p.ellipse(p.mouseX, p.mouseY, size, size);

      if (vectorResource) {
        vectorResource.move(size);
      }
    }
  };
};
