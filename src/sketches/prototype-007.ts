import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Orbital Ellipses',
	date: '2022-07-16',
	description:
		'Ellipses rotate and drift outward from center, driven by a mathematical oscillation that gradually winds down. Each run is unique due to randomized initial size and rotation increment.',
	tags: ['generative', 'math', 'animation', 'auto'],
};

type System = {
	max: number;
	size: number;
	sizeDir: number;
	deg: number;
	degIncrement: number;
	x: number;
	y: number;
	originX: number;
	originY: number;
	trail: Array<[number, number]>;
};

export default (p: p5) => {
	let restartDelay = 0;

	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-007-' + Date.now() });

	const spawn = (ox: number, oy: number): System => ({
		max: 360,
		size: p.random(p.windowHeight / 8, p.windowHeight / 4),
		sizeDir: p.random() > 0.5 ? 1 : -1,
		deg: 0,
		degIncrement: p.random(0.01, p.PI) * (p.random() > 0.5 ? 1 : -1),
		x: 0,
		y: 0,
		originX: ox,
		originY: oy,
		trail: [],
	});

	let systems: System[] = [spawn(p.windowWidth * 0.5, p.windowHeight * 0.5)];

	const stepSystem = (s: System): boolean => {
		if (s.max <= 0) return false;

		const alpha = p.map(s.max, 0, 360, 0, 255);
		const ex = s.deg > 0 ? (s.x / s.deg) % p.windowWidth : 0;
		const ey = s.deg > 0 ? (s.y / s.deg) % p.windowHeight : 0;

		// world-space center of the ellipse for trail
		const wx = s.originX + ex * Math.cos(s.deg) - ey * Math.sin(s.deg);
		const wy = s.originY + ex * Math.sin(s.deg) + ey * Math.cos(s.deg);
		s.trail.push([wx, wy]);

		// draw trail — older points fade toward transparent
		p.strokeWeight(1);
		for (let i = 1; i < s.trail.length; i++) {
			const t = i / s.trail.length;
			p.stroke(0, 0, 100, t * alpha * 0.5);
			p.line(s.trail[i - 1][0], s.trail[i - 1][1], s.trail[i][0], s.trail[i][1]);
		}

		// draw current ellipse
		p.push();
		p.translate(s.originX, s.originY);
		p.noFill();
		p.strokeWeight(1);
		p.stroke(0, 0, 100, alpha);
		p.rotate(s.deg);
		p.ellipse(ex, ey, s.size, s.size);
		p.pop();

		if (s.x >= p.windowWidth) {
			s.x = 0;
			s.y += s.size;
		} else {
			s.x += s.size;
		}

		if (p.random() < 0.02) s.sizeDir *= -1;
		if (p.random() < 0.01) s.degIncrement *= -1;

		if (s.max % Math.max(1, Math.floor(s.size))) {
			s.deg += s.degIncrement;
			s.size += 3 * s.sizeDir;
		} else {
			s.sizeDir *= -1;
			s.size += 3 * s.sizeDir;
		}

		if (s.size < 30 || s.size > p.windowHeight * 0.8) s.max = 0;
		--s.max;

		return true;
	};

	p.draw = () => {
		// Slow fade builds texture as systems overlap and ghost out
		p.push();
		p.noStroke();
		p.fill(0, 0, 0, 3);
		p.rect(0, 0, p.windowWidth, p.windowHeight);
		p.pop();

		systems = systems.filter(stepSystem);

		if (systems.length === 0) {
			restartDelay++;
			if (restartDelay >= 90) {
				p.background(0);
				systems = [spawn(p.windowWidth * 0.5, p.windowHeight * 0.5)];
				restartDelay = 0;
			}
		}
	};

	p.mouseClicked = () => {
		systems.push(spawn(p.mouseX, p.mouseY));
	};
};
