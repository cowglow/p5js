import p5 from 'p5';
import Jitter from '../classes/jitter';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';

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
