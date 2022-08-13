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

const LOCAL_STORAGE_KEY = "sketchIndex";

const sketches = {
  "prototype-001.ts": sketch1,
  "prototype-002.ts": sketch2,
  "prototype-003.ts": sketch3,
  "prototype-004.ts": sketch4,
  "prototype-005.ts": sketch5,
  "prototype-006.ts": sketch6,
  "prototype-007.ts": sketch7,
  "prototype-008.ts": sketch8,
};

let currentSketch = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? localStorage.getItem(LOCAL_STORAGE_KEY)
  : localStorage.setItem(LOCAL_STORAGE_KEY, Object.keys(sketches)[0]);

const titleElement = document.querySelector<HTMLDivElement>("header");
if (titleElement) {
  const dropdown = createDropdown(
    Object.keys(sketches),
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
  new p5(sketches[currentSketch], containerElement);
}
