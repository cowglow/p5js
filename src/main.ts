import "./style.css";
import sketch1 from "./sketches/prototype-001.js";
import sketch2 from "./sketches/prototype-002.js";
import p5 from "p5";

const sketches = [sketch1, sketch2];
const sketchNames = ["prototype-001.ts", "prototype-002.ts"];
const sketchIndex = Math.floor(Math.random() * sketches.length);

const titleElement = document.querySelector<HTMLDivElement>("header");
const containerElement = document.querySelector<HTMLDivElement>("#container");

if (titleElement) {
  titleElement.innerHTML = sketchNames[sketchIndex];
}

if (containerElement) {
  new p5(sketches[sketchIndex], containerElement);
}
