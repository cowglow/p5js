// Based on github.com/arpitbbhayani/recursion/blob/master/05-sierpinski-triangle.js

import p5 from "p5";
import Triangle from "../classes/triangle";
import { bootstrapCanvas } from "../lib/bootstrap-canvas";
import { bootstrapEventLister } from "../lib/bootstrap-event-lister";
import { getMidPoint } from "../lib/get-mid-point";

export default (p: p5) => {
  let max = 1;
  bootstrapCanvas(p, 0, false);
  bootstrapEventLister(p, { filename: "prototype-008-" + Date.now() });

  let p1 = p.createVector(p.windowWidth / 2, 0);
  let p2 = p.createVector(0, p.windowHeight);
  let p3 = p.createVector(p.windowWidth, p.windowHeight);
  let parentTriangle = new Triangle(p, p1, p2, p3);

  p.draw = () => {
    p.stroke(255);
    p.noFill();
    parentTriangle.draw(true);
  };

  p.mouseClicked = () => {
    if (max <= 6) {
      drawSierpinskiTriangle(p, parentTriangle, max);
      max = max + 1;
    }
  };
};

function drawSierpinskiTriangle(p: p5, tri: Triangle, max: number) {
  if (max === 0) {
    return;
  }
  let m1 = getMidPoint(p, tri.p1, tri.p2);
  let m2 = getMidPoint(p, tri.p2, tri.p3);
  let m3 = getMidPoint(p, tri.p3, tri.p1);

  let t0 = new Triangle(p, m1, m2, m3);
  t0.draw(Math.random() < 0.5);

  let t1 = new Triangle(p, tri.p1, m1, m3);
  let t2 = new Triangle(p, tri.p2, m1, m2);
  let t3 = new Triangle(p, tri.p3, m2, m3);

  drawSierpinskiTriangle(p, t1, max - 1);
  drawSierpinskiTriangle(p, t2, max - 1);
  drawSierpinskiTriangle(p, t3, max - 1);
}
