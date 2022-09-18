import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";

export default (p: p5) => {
  bootstrapCanvas(p, 0, false);
  bootstrapEventLister(p, { filename: "prototype-009-" + Date.now() });

  p.draw = () => {
    const initialDiameter = p.windowWidth * 0.75;
    p.noFill();
    p.stroke(255);
    p.circle(p.windowWidth * 0.5, p.windowHeight * 0.5, initialDiameter);
    const random = Math.random();
    for (let i = 0; i < initialDiameter; i++) {
      p.stroke(255 / i);
      p.circle(
        p.windowWidth * 0.5,
        p.windowHeight * 0.5,
        (initialDiameter * random) / i
      );
    }
  };
};