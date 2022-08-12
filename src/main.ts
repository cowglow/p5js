import p5 from "p5";
import createDropdown from "./lib/create-dropdown";

const LOCAL_STORAGE_KEY = "sketchIndex";

const prototypeIndexNum = (i: number) => {
  const name = "000" + (i + 1);
  return name.substring(name.length - 3);
};

const sketches = [
  "sketch1",
  "sketch2",
  "sketch3",
  "sketch4",
  "sketch5",
  "sketch6",
  "sketch7",
  "sketch8",
];

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, "0");
} else {
  let currentValue = Number(localStorage.getItem(LOCAL_STORAGE_KEY));
  localStorage.setItem(LOCAL_STORAGE_KEY, Number(currentValue + 1).toString());
}

const sketchIndex = 0;
//   Number(localStorage.getItem(LOCAL_STORAGE_KEY)) % sketches.length;

const titleElement = document.querySelector<HTMLDivElement>("header");
if (titleElement) {
  const dropdown = createDropdown(sketches);
  titleElement.innerHTML = `prototype: ${prototypeIndexNum(sketchIndex)}`;
  titleElement.appendChild(dropdown);
}

const containerElement = document.querySelector<HTMLDivElement>("#container");
if (containerElement) {
  // new p5(sketches[sketchIndex], containerElement);
}
