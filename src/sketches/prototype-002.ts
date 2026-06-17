import p5 from 'p5';
import Jitter from '../classes/jitter';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Jitter Bug',
	date: '2022-06-18',
	description:
		'Click to spawn a wandering bug that jitters across the canvas, trailing ellipses with shifting hues. Release the mouse to dismiss it.',
	tags: ['interactive', 'mouse', 'animation', 'oop'],
};

export default (p: p5) => {
	let isPressed: boolean = false;
	let bug: Jitter | undefined;

	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-002-' + Date.now() });

	p.draw = () => {
		if (bug) {
			bug.display();
			bug.move();
		}

		if (p.mouseIsPressed && !isPressed) {
			bug = bug ? undefined : new Jitter(p, p.mouseX, p.mouseY);
		}

		isPressed = p.mouseIsPressed;
	};

	p.mouseReleased = () => {
		bug = undefined;
	};
};
