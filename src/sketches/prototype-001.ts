import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';

export default (p: p5) => {
	const growDirectionState = ['up', 'down'];
	const minSize = 10;
	const maxSize = 240;

	let growDirection = growDirectionState[0];
	let size = minSize;

	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-001-' + Date.now() });

	p.draw = () => {
		if (p.mouseIsPressed) {
			if (growDirection === 'up') {
				size = size + 1;
			}

			if (growDirection === 'down') {
				size = size - 1;
			}

			if (size === minSize) {
				growDirection = growDirectionState[0];
			}

			if (size === maxSize) {
				growDirection = growDirectionState[1];
			}

			p.stroke(1);
			p.fill(0, 0, 33, size / 700);
			// p.fill(p.mouseY % 256, p.mouseX % 256, 255, size / 700);
			p.ellipse(p.mouseX, p.mouseY, size, size);
		} else {
			growDirection = growDirectionState[0];
			size = minSize;
		}
	};
};
