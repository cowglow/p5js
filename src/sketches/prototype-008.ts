// Based on github.com/arpitbbhayani/recursion/blob/master/05-sierpinski-triangle.js

import p5 from 'p5';
import Triangle from '../classes/triangle';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { getMidPoint } from 'lib/get-mid-point';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Sierpinski Triangle',
	date: '2022-07-20',
	description:
		'Click to add a level of recursion to the Sierpinski triangle fractal. Each click subdivides the triangle further, up to 6 levels of depth.',
	tags: ['interactive', 'click', 'fractal', 'math', 'recursive'],
};

export default (p: p5) => {
	let max = 1;
	bootstrapCanvas(p, 0, false);
	bootstrapEventListener(p, { filename: 'prototype-008-' + Date.now() });

	const p1 = p.createVector(p.windowWidth / 2, 0);
	const p2 = p.createVector(0, p.windowHeight);
	const p3 = p.createVector(p.windowWidth, p.windowHeight);
	const parentTriangle = new Triangle(p, p1, p2, p3);

	p.draw = () => {
		p.stroke(255);
		p.noFill();
		parentTriangle.draw(true);
	};

	p.mouseClicked = () => {
		if (max <= 6) {
			drawSierpinskiTriangle(p, parentTriangle, max);
			max = max + 1;
		}
	};
};

function drawSierpinskiTriangle(p: p5, tri: Triangle, max: number) {
	if (max === 0) {
		return;
	}
	const m1 = getMidPoint(p, tri.p1, tri.p2);
	const m2 = getMidPoint(p, tri.p2, tri.p3);
	const m3 = getMidPoint(p, tri.p3, tri.p1);

	const t0 = new Triangle(p, m1, m2, m3);
	t0.draw(Math.random() < 0.5);

	const t1 = new Triangle(p, tri.p1, m1, m3);
	const t2 = new Triangle(p, tri.p2, m1, m2);
	const t3 = new Triangle(p, tri.p3, m2, m3);

	drawSierpinskiTriangle(p, t1, max - 1);
	drawSierpinskiTriangle(p, t2, max - 1);
	drawSierpinskiTriangle(p, t3, max - 1);
}
