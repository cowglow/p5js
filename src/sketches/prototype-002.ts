import p5 from "p5";
import Jitter from "../classes/jitter";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";

export default (p: p5) => {
  let isPressed: boolean = false;
  let bug: Jitter | undefined;

  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-002-" + Date.now() });

  p.draw = () => {
    if (bug) {
      bug.display();
      bug.move();
    }

    if (p.mouseIsPressed && !isPressed) {
      bug = bug ? undefined : new Jitter(p, p.mouseX, p.mouseY);
    }

    isPressed = p.mouseIsPressed;
  };

  p.mouseReleased = () => {
    bug = undefined;
  };
};
