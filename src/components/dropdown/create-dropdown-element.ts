import getCurrentSketch from 'lib/get-current-sketch';
import changeDropdownOption from 'components/dropdown/change-dropdown-option';

export default function createDropdownElement(options: string[]) {
	const select = document.createElement('select');
	const defaultValue = getCurrentSketch(options[0]);

	options.forEach((option) => {
		const optionElement = document.createElement('option');
		optionElement.innerText = option;
		optionElement.setAttribute('value', option);
		if (defaultValue && option === defaultValue) optionElement.selected = true;
		select.appendChild(optionElement);
	});

	select.addEventListener('change', (event) => {
		event.preventDefault();
		changeDropdownOption(select.value);
	});

	return select;
}
