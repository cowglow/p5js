import p5 from 'p5';
import { Sketch } from 'sketches';

let instance: p5 | null = null;

export function renderSketchDetail(sketch: Sketch, container: HTMLElement) {
	destroySketch();

	container.className = 'sketch-detail';
	container.innerHTML = `
		<div id="canvas-container"></div>
		<aside class="sketch-info">
			<h1>${sketch.meta.title}</h1>
			<time>${sketch.meta.date}</time>
			<p>${sketch.meta.description}</p>
			<div class="sketch-info-tags">
				${sketch.meta.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
			</div>
		</aside>
	`;

	const canvasContainer = container.querySelector<HTMLElement>('#canvas-container')!;
	instance = new p5(sketch.content, canvasContainer);
}

export function destroySketch() {
	if (instance) {
		instance.remove();
		instance = null;
	}
}
