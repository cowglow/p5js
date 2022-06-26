import "./style.css";
import sketch1 from "./sketches/prototype-001.js";
import sketch2 from "./sketches/prototype-002.js";
import p5 from "p5";

const sketches = [sketch1, sketch2];

const targetElement = document.querySelector<HTMLDivElement>("#container")!;
new p5(sketches[Math.floor(Math.random() * sketches.length)], targetElement);
