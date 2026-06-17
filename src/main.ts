import sketches from 'sketches/index';
import { getRoute, navigateToGallery } from 'lib/router';
import exportCanvas from 'lib/export-canvas';
import { renderGallery } from './views/gallery';
import { renderSketchDetail, destroySketch } from './views/sketch-detail';

const header = document.querySelector<HTMLElement>('header')!;
const container = document.querySelector<HTMLElement>('#container')!;

function render() {
	const route = getRoute();

	if (route.view === 'gallery') {
		destroySketch();
		header.innerHTML = '<span class="site-title">cowglow / p5js</span>';
		renderGallery(sketches, container);
		return;
	}

	const sketch = sketches.find((s) => s.file === route.file);
	if (!sketch) {
		navigateToGallery();
		return;
	}

	header.innerHTML = `
		<div class="header-left">
			<button id="back-button">← Gallery</button>
			<span class="site-title">${sketch.meta.title}</span>
		</div>
		<button id="export-button">Export</button>
	`;
	document.getElementById('back-button')?.addEventListener('click', navigateToGallery);
	document.getElementById('export-button')?.addEventListener('click', () => exportCanvas(sketch.file));

	renderSketchDetail(sketch, container);
}

window.addEventListener('popstate', render);
render();
