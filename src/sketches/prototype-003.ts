import p5 from 'p5';
import { bootstrapCanvas, defaultCanvasDimensions } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import VectorResource from '../classes/vector';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Vector Constellation',
	date: '2022-06-27',
	description:
		'Hold the mouse to draw constellation lines and ellipses radiating from center. A vector image drifts with the cursor, and a centered piece locks in place once triggered.',
	tags: ['interactive', 'mouse', 'image', 'geometry'],
};

export default (p: p5) => {
	const palette = ['187, 233, 200', '67, 54, 80', '103, 185, 213', '253, 196, 78', '197, 81, 72'];
	let vectorResource: VectorResource | undefined;
	let color = palette[Math.floor(Math.random() * palette.length)];
	const maxSize = 80;
	let centerPiece: VectorResource | undefined;
	let imageResource: p5.Image;

	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-003-' + Date.now() });

	p.preload = () => {
		imageResource = p.loadImage(`${import.meta.env['BASE_URL']}vector/Vector.png`);
	};

	p.setup = () => {
		const { canvasWidth, canvasHeight } = defaultCanvasDimensions;
		p.createCanvas(canvasWidth, canvasHeight);
		p.background(`rgba(${color}, 0.65)`);
		p.angleMode(p.DEGREES);
		vectorResource = new VectorResource(p, palette, imageResource);
	};

	p.draw = () => {
		color = palette[Math.floor(Math.random() * palette.length)];

		if (p.mouseIsPressed) {
			const size = Math.floor(Math.random() * maxSize);
			const v1 = p.createVector(window.innerWidth / 2, window.innerHeight / 2);

			p.fill(`rgba(${color}, 0.4)`);
			p.stroke(`rgba(${color}, 0.4)`);
			p.ellipseMode(p.CENTER);

			p.line(v1.x, v1.y, p.mouseX, p.mouseY);
			p.ellipse(p.mouseX, p.mouseY, size, size);

			if (vectorResource) {
				vectorResource.move(size);
			}

			if (size === maxSize / 2 && !centerPiece) {
				centerPiece = new VectorResource(p, palette, imageResource);
				centerPiece.center();
			}
		}
	};
};
