import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";

let size = 50;
let rowSize = 50;
let x = 0;
let y = 0;

export default (p: p5) => {
  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-004-" + Date.now() });

  p.draw = () => {
    let random = Math.random();
    p.stroke(255, random);
    p.strokeWeight(size);
    if (random < 0.5) {
      p.line(x, y, x + size, y + size);
    } else {
      p.line(x, y + size, x + size, y);
    }

    x = x + size;
    if (x > p.width) {
      x = 0;
      y = y + rowSize;
    }

    if (y > p.height) {
      p.noLoop();
    }
  };
};
