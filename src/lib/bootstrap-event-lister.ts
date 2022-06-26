import p5 from "p5";

interface PayloadInterface {
  filename: string;
}

export const bootstrapEventLister = (p: p5, payload: PayloadInterface) => {
  p.keyTyped = () => {
    if (p.key === "s") {
      const { filename } = payload;
      p.saveCanvas(filename, "png");
    }
  };

  // Todo: Extend P5 with out own function
  // @ts-ignore
  p.exportCanvas = () => {
    console.log("exportCanvas");
  };
};
