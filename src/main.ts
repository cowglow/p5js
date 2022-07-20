import p5 from "p5";
import "./style.css";
import sketch1 from "./sketches/prototype-001.js";
import sketch2 from "./sketches/prototype-002.js";
import sketch3 from "./sketches/prototype-003.js";
import sketch4 from "./sketches/prototype-004.js";
import sketch5 from "./sketches/prototype-005.js";
import sketch6 from "./sketches/prototype-006.js";
import sketch7 from "./sketches/prototype-007.js";
import sketch8 from "./sketches/prototype-008.js";

const prototypeIndexNum = (i: number) => {
  const name = "000" + (i + 1);
  return name.substring(name.length - 3);
};

const sketches = [
  sketch1,
  sketch2,
  sketch3,
  sketch4,
  sketch5,
  sketch6,
  sketch7,
  sketch8
];
const sketchIndex = Math.floor(Math.random() * sketches.length);

const titleElement = document.querySelector<HTMLDivElement>("header");
const containerElement = document.querySelector<HTMLDivElement>("#container");
if (titleElement)
  titleElement.innerHTML = `prototype-${prototypeIndexNum(sketchIndex)}.ts`;

if (containerElement) {
  new p5(sketches[sketchIndex], containerElement);
}
