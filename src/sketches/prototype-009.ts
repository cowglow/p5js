import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Concentric Rings',
	date: '2022-09-18',
	description:
		'Concentric circles shrink toward center with fading opacity, redrawn each frame with a new random scale. The result flickers between ordered and chaotic.',
	tags: ['generative', 'geometry', 'ambient'],
};

export default (p: p5) => {
	bootstrapCanvas(p, 0, false);
	bootstrapEventListener(p, { filename: 'prototype-009-' + Date.now() });

	p.draw = () => {
		const initialDiameter = p.windowWidth * 0.75;
		p.noFill();
		p.stroke(255);
		p.circle(p.windowWidth * 0.5, p.windowHeight * 0.5, initialDiameter);
		const random = Math.random();
		for (let i = 0; i < initialDiameter; i++) {
			p.stroke(255 / i);
			p.circle(p.windowWidth * 0.5, p.windowHeight * 0.5, (initialDiameter * random) / i);
		}
	};
};
