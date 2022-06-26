import p5 from "p5";

export default (p: p5) => {
  const growDirectionState = ["up", "down"];
  const minSize = 10;
  const maxSize = 360;

  let growDirection = growDirectionState[0];
  let size = minSize;

  const canvasPadding = 50;
  const canvasWidth = window.innerWidth - canvasPadding;
  const canvasHeight = window.innerHeight - canvasPadding;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(0);
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      if (growDirection === "up") {
        size = size + 1;
      }

      if (growDirection === "down") {
        size = size - 1;
      }

      if (size === minSize) {
        growDirection = growDirectionState[0];
      }

      if (size === maxSize) {
        growDirection = growDirectionState[1];
      }

      p.stroke(1);
      p.fill(0, 0, 33, size / 700);
      // p.fill(p.mouseY % 256, p.mouseX % 256, 255, size / 700);
      p.ellipse(p.mouseX, p.mouseY, size, size);
    } else {
      growDirection = growDirectionState[0];
      size = minSize;
    }
  };

  p.keyTyped = () => {
    if (p.key === "s") {
      const filename = "prototype-001-" + Date.now();
      console.log(filename);
      p.saveCanvas(filename, "png");
    }
  };
};
