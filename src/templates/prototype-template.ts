import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";

export default (p: p5) => {
  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-xxx-" + Date.now() });

  p.draw = () => {};
};
