import p5 from "p5";
import createDropdown from "./lib/create-dropdown";
import sketch1 from "./sketches/prototype-001";
import sketch2 from "./sketches/prototype-002";
import sketch3 from "./sketches/prototype-003";
import sketch4 from "./sketches/prototype-004";
import sketch5 from "./sketches/prototype-005";
import sketch6 from "./sketches/prototype-006";
import sketch7 from "./sketches/prototype-007";
import sketch8 from "./sketches/prototype-008";
import sketch9 from "./sketches/prototype-009";

const LOCAL_STORAGE_KEY = "sketchIndex";

const sketches = [
  { file: "prototype-001.ts", content: sketch1 },
  { file: "prototype-002.ts", content: sketch2 },
  { file: "prototype-003.ts", content: sketch3 },
  { file: "prototype-004.ts", content: sketch4 },
  { file: "prototype-005.ts", content: sketch5 },
  { file: "prototype-006.ts", content: sketch6 },
  { file: "prototype-007.ts", content: sketch7 },
  { file: "prototype-008.ts", content: sketch8 },
  { file: "prototype-009.ts", content: sketch9 },
];

let currentSketch = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? localStorage.getItem(LOCAL_STORAGE_KEY)
  : localStorage.setItem(LOCAL_STORAGE_KEY, sketches[0].file);

const titleElement = document.querySelector<HTMLDivElement>("header");
if (titleElement) {
  const dropdown = createDropdown(
    sketches.map((sketch) => sketch.file),
    (value) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, value);
      window.location.reload();
    },
    currentSketch
  );
  if (currentSketch) titleElement.innerText = currentSketch.split(".")[0];
  titleElement.appendChild(dropdown);
}

const containerElement = document.querySelector<HTMLDivElement>("#container");
if (containerElement) {
  const sketchToLoad = sketches.find((sketch) => sketch.file === currentSketch);
  if (sketchToLoad) new p5(sketchToLoad.content, containerElement);
}
