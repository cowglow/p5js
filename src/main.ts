import createDropdownElement from 'components/dropdown/create-dropdown-element';
import createRefreshButton from 'components/refresh-button/create-refresh-button';
import createDropdownOptions from 'components/dropdown/create-dropdown-options';
import sketches from 'sketches/index';
import { LOCAL_STORAGE_KEY } from 'lib/constants';
import p5 from 'p5';
import exportCanvas from 'lib/export-canvas';
import createTitleLabel from 'lib/create-title-label';

const currentSketch = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
if (!currentSketch) {
	window.location.reload();
}

const titleElement = document.querySelector<HTMLDivElement>('header');
if (titleElement) {
	// Dropdown
	const dropdownOptions = createDropdownOptions(sketches);
	const dropdownElement = createDropdownElement(dropdownOptions);
	// Refresh
	const refreshButton = createRefreshButton('Refresh');
	// Wrapper
	const wrapper = document.createElement('div');
	wrapper.classList.add('header-controls');
	wrapper.appendChild(refreshButton);
	wrapper.appendChild(dropdownElement);

	titleElement.innerText = createTitleLabel(currentSketch);
	titleElement.appendChild(wrapper);
}

const containerElement = document.querySelector<HTMLDivElement>('#container');
if (containerElement) {
	const sketchToLoad = sketches.find((sketch) => sketch.file === currentSketch);
	if (sketchToLoad) new p5(sketchToLoad.content, containerElement);
}

const exportButton = document.getElementById('exportButton');
if (exportButton) {
	exportButton.addEventListener('click', (event) => {
		event.preventDefault();
		exportCanvas(currentSketch);
	});
}
