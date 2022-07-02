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
    p.stroke(255);
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
    // if (p.mouseIsPressed) {
    //   if (p.mouseX < p.width * 0.5) {
    //     ++size;
    //   } else {
    //     --size;
    //   }
    //
    //   if (p.mouseY < p.height * 0.5) {
    //     ++rowSize;
    //   } else {
    //     --rowSize;
    //   }
    // }
  };
};
