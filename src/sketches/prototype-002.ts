import p5 from "p5";
import Jitter from "../classes/jitter";

export default (p: p5) => {
  let isPressed: boolean = false;
  const canvasPadding = 50;
  let size = 50;
  let bug: Jitter | undefined;

  const canvasWidth = window.innerWidth - canvasPadding;
  const canvasHeight = window.innerHeight - canvasPadding;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(0);
    p.colorMode(p.HSB, 360, 100, 100);
  };

  p.draw = () => {
    if (bug) {
      bug.display();
      bug.move();
    }

    if (p.mouseIsPressed && isPressed === false) {
      bug = bug ? undefined : new Jitter(p, p.mouseX, p.mouseY);
    }

    isPressed = p.mouseIsPressed;
  };

  p.mouseMoved = () => {
    size = 50;
  };

  p.mouseReleased = () => {
    bug = undefined;
  };

  p.keyTyped = () => {
    if (p.key === "s") {
      const filename = "prototype-002-" + Date.now();
      console.log(filename);
      p.saveCanvas(filename, "png");
    }
  };
};
