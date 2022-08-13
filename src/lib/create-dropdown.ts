type DropdownOptions = string[];
type DropdownChangeHandler = (value: string) => void;

export default function createDropdown(
  sketches: DropdownOptions,
  changeHandler: DropdownChangeHandler,
  defaultValue?: string | null | void
) {
  let select = document.createElement("select");

  sketches.forEach((sketch) => {
    let optionElement = document.createElement("option");
    optionElement.innerText = sketch;
    optionElement.setAttribute("value", sketch);
    if (defaultValue && sketch === defaultValue) optionElement.selected = true;
    select.appendChild(optionElement);
  });

  select.addEventListener("change", (event) => {
    event.preventDefault();
    changeHandler(select.value);
  });

  return select;
}
