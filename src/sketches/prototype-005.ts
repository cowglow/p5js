import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";
import CharacterColumn from "../classes/character-column";

export default (p: p5) => {
  bootstrapCanvas(p);
  bootstrapEventLister(p, { filename: "prototype-005-" + Date.now() });

  let frameInterval = 2;
  let charSize = 14;

  let columns: CharacterColumn[] = [];
  for (let i = 0; i <= p.windowWidth / charSize; ++i) {
    let charColumn = new CharacterColumn(
      p,
      charSize,
      charSize * i,
      Math.floor(p.random(charSize, charSize * charSize)),
      Math.floor(p.random(frameInterval, frameInterval * charSize)),
      Math.floor(p.random(18, p.windowHeight / charSize))
    );
    columns.push(charColumn);
  }

  p.draw = () => {
    if (p.frameCount % frameInterval == 1) {
      p.background(0, 0.66);
      columns.forEach((column) => {
        column.displayColumn();
      });
    }
  };
};
