import sketches from 'sketches/index';
import { getRoute, navigateToGallery } from 'lib/router';
import exportCanvas from 'lib/export-canvas';
import { renderGallery } from './views/gallery';
import { renderSketchDetail, destroySketch } from './views/sketch-detail';

const header = document.querySelector<HTMLElement>('header')!;
const container = document.querySelector<HTMLElement>('#container')!;
const exportButton = document.getElementById('exportButton');

function render() {
	const route = getRoute();

	if (route.view === 'gallery') {
		destroySketch();
		header.innerHTML = '<span class="site-title">cowglow / p5js</span>';
		if (exportButton) exportButton.style.display = 'none';
		renderGallery(sketches, container);
		return;
	}

	const sketch = sketches.find((s) => s.file === route.file);
	if (!sketch) {
		navigateToGallery();
		return;
	}

	header.innerHTML = `
		<button id="back-button">← Gallery</button>
		<span class="site-title">${sketch.meta.title}</span>
	`;
	document.getElementById('back-button')?.addEventListener('click', navigateToGallery);

	if (exportButton) {
		exportButton.style.display = '';
		exportButton.onclick = () => exportCanvas(sketch.file);
	}

	renderSketchDetail(sketch, container);
}

window.addEventListener('popstate', render);
render();
