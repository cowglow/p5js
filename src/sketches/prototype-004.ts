import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventListener } from "../lib/bootstrap-event-listener";

let size = 50;
let rowSize = 50;
let x = 0;
let y = 0;

export default (p: p5) => {
  bootstrapCanvas(p);
  bootstrapEventListener(p, { filename: "prototype-004-" + Date.now() });

  p.draw = () => {
    p.strokeWeight(size);

    // Randomize color or non-color
    if (Math.random() > 0.5) {
      p.stroke(
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        255,
        Math.random()
      );
    } else {
      p.stroke(255, Math.random());
    }

    // Randomize direction
    if (Math.random() < 0.5) {
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
