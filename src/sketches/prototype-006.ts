import p5 from "p5";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventListener } from "../lib/bootstrap-event-listener";
import VectorResource from "../classes/vector";

export default (p: p5) => {
  let cTile: p5.Image;
  let lTile: p5.Image;
  let wTile: p5.Image;

  let max = 100;
  let x = 0;
  let y = 0;

  bootstrapCanvas(p, 250);
  bootstrapEventListener(p, { filename: "prototype-006-" + Date.now() });

  p.preload = () => {
    cTile = p.loadImage(`${import.meta.env["BASE_URL"]}cg-tiles/C.png`);
    lTile = p.loadImage(`${import.meta.env["BASE_URL"]}cg-tiles/L.png`);
    wTile = p.loadImage(`${import.meta.env["BASE_URL"]}cg-tiles/W.png`);

    if (cTile && lTile && wTile) {
      const columns = Math.round(p.windowWidth / cTile.width) * 0.01;
      const rows = Math.round(p.windowHeight / cTile.height) * 0.01;
      max = Math.floor(rows * columns) * 3;
    }
  };

  p.draw = () => {
    p.translate(p.windowWidth * 0.5, 0);
    let deg = getRandomRotation();
    if (max > 0) {
      const image =
        Math.random() > 0.5 ? cTile : Math.random() > 0.5 ? lTile : wTile;
      const tile = new VectorResource(p, [], image);

      p.push();
      p.rotate(deg);
      tile.moveTo(x, y);

      p.pop();

      if (x >= p.windowWidth) {
        x = 0;
        y = y + cTile.height;
      } else {
        x = x + cTile.width;
      }
      --max;
    }
  };
};

function getRandomRotation() {
  return [0, 45, 90, 135, 180][Math.floor(Math.random() * 4)];
}
