import "./style.css";
import sketch1 from "./sketches/prototype-001.js";
import sketch2 from "./sketches/prototype-002.js";
import sketch3 from "./sketches/prototype-003.js";
import p5 from "p5";

const sketches = [sketch1, sketch2, sketch3];
const sketchNames = [
  "prototype-001.ts",
  "prototype-002.ts",
  "prototype-003.ts",
];
// const sketchIndex = Math.floor(Math.random() * sketches.length);
const sketchIndex = 2;

const titleElement = document.querySelector<HTMLDivElement>("header");
const containerElement = document.querySelector<HTMLDivElement>("#container");
const buttonElement =
  document.querySelector<HTMLButtonElement>("footer button");

if (titleElement) {
  titleElement.innerHTML = sketchNames[sketchIndex];
}

if (containerElement) {
  new p5(sketches[sketchIndex], containerElement);
}

if (buttonElement) {
  buttonElement.addEventListener("click", (event) => {
    console.log(event);
  });
}
