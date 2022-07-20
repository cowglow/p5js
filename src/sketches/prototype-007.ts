import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";

export default (p: p5) => {
  let max = 360;
  let size = p.random(p.windowHeight / 8, p.windowHeight / 4);
  let deg = 0;
  let degIncrement = p.random(0, p.PI);
  let x = 0;
  let y = 0;

  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-007-" + Date.now() });

  p.draw = () => {
    p.translate(p.windowWidth * 0.5, p.windowHeight * 0.5);
    if (max > 0) {
      p.push();
      p.noFill();
      p.rotate(deg);
      p.stroke(255);
      p.ellipse(
        (x / deg) % p.windowWidth,
        (y / deg) % p.windowHeight,
        size,
        size
      );
      p.pop();

      if (x >= p.windowWidth) {
        x = 0;
        y = y + size;
      } else {
        x = x + size;
      }
    }
    if (max % size) {
      deg = deg + degIncrement;
      size = size - 3;
    } else {
      size = size + 3;
    }

    if (size < 90){
      max = 0;
    }
    --max;
  };
};
