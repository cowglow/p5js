import p5 from "p5";
import Jitter from "../classes/jitter";

export default (p: p5) => {
  const canvasPadding = 50;
  let size = 50;
  let bug: Jitter;

  const canvasWidth = window.innerWidth - canvasPadding;
  const canvasHeight = window.innerHeight - canvasPadding;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(0);
    bug = new Jitter(p, p.random(canvasWidth), p.random(canvasHeight));
  };

  p.draw = () => {
    p.rectMode(p.CENTER);

    if (p.mouseIsPressed) {
      bug.move();
      bug.display();
    }
  };

  p.mouseMoved = () => {
    size = 50;
  };

  p.keyTyped = () => {
    if (p.key === "s") {
      const filename = "prototype-002-" + Date.now();
      console.log(filename);
      p.saveCanvas(filename, "png");
    }
  };
};
