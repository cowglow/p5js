import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventListener } from "../lib/bootstrap-event-listener";

export default (p: p5) => {
  bootstrapCanvas(p);
  bootstrapEventListener(p, { filename: "prototype-xxx-" + Date.now() });

  p.draw = () => {};
};
