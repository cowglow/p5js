import p5 from "p5";

interface CanvasDimensions {
  canvasWidth: number;
  canvasHeight: number;
}

const defaultCanvasDimensions: CanvasDimensions = {
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
};

export const bootstrapCanvas = (p: p5) => {
  const { canvasWidth, canvasHeight } = defaultCanvasDimensions;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(0);
  };
};