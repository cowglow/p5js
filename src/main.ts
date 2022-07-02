import "./style.css";
import sketch1 from "./sketches/prototype-001.js";
import sketch2 from "./sketches/prototype-002.js";
import sketch3 from "./sketches/prototype-003.js";
import sketch4 from "./sketches/prototype-004.js";
import p5 from "p5";

const prototypeIndexNum = (i: number) => {
  const name = "000" + (i + 1);
  return name.substring(name.length - 3);
};

const sketches = [sketch1, sketch2, sketch3, sketch4];
const sketchIndex = Math.floor(Math.random() * sketches.length);

const titleElement = document.querySelector<HTMLDivElement>("header");
const containerElement = document.querySelector<HTMLDivElement>("#container");
const buttonElement =
  document.querySelector<HTMLButtonElement>("footer button");

if (titleElement)
  titleElement.innerHTML = `prototype-${prototypeIndexNum(sketchIndex)}.ts`;

if (containerElement) {
  new p5(sketches[sketchIndex], containerElement);
}

if (buttonElement) {
  buttonElement.addEventListener("click", (event) => {
    console.log(event);
  });
}
