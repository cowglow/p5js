import "./style.css";
// import sketch from "./sketches/prototype-001.js";
import sketch from "./sketches/prototype-002.js";
import p5 from "p5";

const targetElement = document.querySelector<HTMLDivElement>("#container")!;
new p5(sketch, targetElement);
