import p5 from "p5";

export default (p: p5) => {
  const growDirectionState = ["up", "down"];
  const minSize = 10;
  const maxSize = 360;

  let growDirection = growDirectionState[0];
  let size = minSize;
  let colorValue;

  p.setup = () => {
    p.createCanvas(1920, 1080);
    // colorMode(HSB, 360,100,100);
    p.background(0);
    colorValue = 0;
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      // colorValue = size % 360

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
      p.fill(360, 360, 360);

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
