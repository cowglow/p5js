import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Diagonal Grid',
	date: '2022-07-02',
	description:
		'An algorithm fills the canvas cell by cell with randomized diagonal lines — each a coin-flip between / and \\. Color or monochrome, decided at random. Runs once and stops.',
	tags: ['generative', 'grid', 'auto'],
};

export default (p: p5) => {
	const size = 50;
	const rowSize = 50;
	let x = 0;
	let y = 0;

	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-004-' + Date.now() });

	p.draw = () => {
		p.strokeWeight(size);

		if (Math.random() > 0.5) {
			p.stroke(
				Math.floor(Math.random() * 256),
				Math.floor(Math.random() * 256),
				255,
				Math.random()
			);
		} else {
			p.stroke(255, Math.random());
		}

		if (Math.random() < 0.5) {
			p.line(x, y, x + size, y + size);
		} else {
			p.line(x, y + size, x + size, y);
		}

		x = x + size;
		if (x > p.width) {
			x = 0;
			y = y + rowSize;
		}

		if (y > p.height) {
			p.noLoop();
		}
	};

	p.mouseClicked = () => {
		x = 0;
		y = 0;
		p.background(0);
		p.loop();
	};
};
