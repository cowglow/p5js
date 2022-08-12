type DropdownOptions = string[];

export default function createDropdown(sketches: DropdownOptions) {
  console.log("create dropdown");

  let output = document.createElement("HTMLSelectElement");
  let option = document.createElement("option");
  console.log(output)
  output.appendChild(option);

  sketches.forEach((sketch) => {
    let optionElement = document.createElement("option");
    optionElement.innerText = sketch;
    output.appendChild(optionElement);
  });
  output.innerText = "create dropdown";
  return output;
}
