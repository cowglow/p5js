import { Sketch } from 'sketches';
import { navigateToSketch } from 'lib/router';

const INTRO = `<p class="gallery-intro">A sketchbook of generative experiments — made in Bavaria, built with p5.js.</p>`;

export function renderGallery(sketches: Sketch[], container: HTMLElement) {
	container.className = 'gallery';
	container.innerHTML = INTRO + sketches
		.map(
			(sketch) => `
		<article class="sketch-card" data-file="${sketch.file}">
			<div class="sketch-card-tags">
				${sketch.meta.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
			</div>
			<h2>${sketch.meta.title}</h2>
			<p>${sketch.meta.description}</p>
			<time>${sketch.meta.date}</time>
		</article>
	`
		)
		.join('');

	container.querySelectorAll<HTMLElement>('.sketch-card').forEach((card) => {
		card.addEventListener('click', () => {
			const file = card.dataset.file;
			if (file) navigateToSketch(file);
		});
	});
}
