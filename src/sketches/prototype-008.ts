import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Sierpinski Triangle',
	date: '2022-07-20',
	description:
		'Start with a triangle. Cut out the middle. Now cut out the middle of each piece that is left. Keep going — the same shape appears inside itself, forever. Click to go one level deeper. Move the mouse to shift the colors. Hold T to stir.',
	tags: ['interactive', 'click', 'fractal', 'math', 'recursive', 'physics'],
};

const MAX_LEVEL = 6;
const REVEAL_FRAMES = 45;
const SPRING = 0.015;
const DAMPING = 0.88;
const INFLUENCE_RADIUS = 180;
const PUSH_STRENGTH = 0.4;
const NOISE_SCALE = 0.006;
const NOISE_TIME = 0.003;

type TriHome = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	x3: number;
	y3: number;
};

interface TriData extends TriHome {
	revealFrame: number;
	dx: number;
	dy: number;
	vx: number;
	vy: number;
}

export default (p: p5) => {
	let level = 0;
	let filledTris: TriData[] = [];
	let middleTris: TriData[] = [];
	let originX = 0;
	let originY = 0;

	bootstrapCanvas(p, 0);
	bootstrapEventListener(p, { filename: 'prototype-008-' + Date.now() });

	const sketchSetup = p.setup!;
	p.setup = () => {
		sketchSetup();
		originX = p.width / 2;
		originY = p.height / 2;
		buildTris();
	};

	function buildTris() {
		const fills: TriHome[] = [];
		const holes: TriHome[] = [];

		collect(p.width / 2, 0, 0, p.height, p.width, p.height, 0, fills, holes);

		const byY = (a: TriHome, b: TriHome) =>
			(a.y1 + a.y2 + a.y3) / 3 - (b.y1 + b.y2 + b.y3) / 3;

		fills.sort(byY);
		holes.sort(byY);

		const stamp = (arr: TriHome[], offset: number): TriData[] =>
			arr.map((t, i) => ({
				...t,
				dx: 0,
				dy: 0,
				vx: 0,
				vy: 0,
				revealFrame:
					p.frameCount + offset + Math.floor((i / Math.max(arr.length - 1, 1)) * REVEAL_FRAMES),
			}));

		filledTris = stamp(fills, 0);
		middleTris = stamp(holes, 8);
	}

	function collect(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		depth: number,
		fills: TriHome[],
		holes: TriHome[]
	) {
		if (depth === level) {
			fills.push({ x1, y1, x2, y2, x3, y3 });
			return;
		}
		const m1x = (x1 + x2) / 2,
			m1y = (y1 + y2) / 2;
		const m2x = (x2 + x3) / 2,
			m2y = (y2 + y3) / 2;
		const m3x = (x3 + x1) / 2,
			m3y = (y3 + y1) / 2;

		holes.push({ x1: m1x, y1: m1y, x2: m2x, y2: m2y, x3: m3x, y3: m3y });

		collect(x1, y1, m1x, m1y, m3x, m3y, depth + 1, fills, holes);
		collect(x2, y2, m1x, m1y, m2x, m2y, depth + 1, fills, holes);
		collect(x3, y3, m2x, m2y, m3x, m3y, depth + 1, fills, holes);
	}

	const angleHue = (tx: number, ty: number) => {
		const angle = Math.atan2(ty - originY, tx - originX);
		return p.map(angle, -Math.PI, Math.PI, 0, 360);
	};

	const applyPhysics = (tri: TriData, mvx: number, mvy: number, pushActive: boolean) => {
		if (pushActive) {
			const cx = (tri.x1 + tri.x2 + tri.x3) / 3 + tri.dx;
			const cy = (tri.y1 + tri.y2 + tri.y3) / 3 + tri.dy;
			const dist = Math.hypot(p.mouseX - cx, p.mouseY - cy);
			if (dist < INFLUENCE_RADIUS) {
				const influence = 1 - dist / INFLUENCE_RADIUS;
				tri.vx += mvx * influence * PUSH_STRENGTH;
				tri.vy += mvy * influence * PUSH_STRENGTH;
			}
		}
		tri.vx += -SPRING * tri.dx;
		tri.vy += -SPRING * tri.dy;
		tri.vx *= DAMPING;
		tri.vy *= DAMPING;
		tri.dx += tri.vx;
		tri.dy += tri.vy;
	};

	p.draw = () => {
		originX += (p.mouseX - originX) * 0.05;
		originY += (p.mouseY - originY) * 0.05;

		const soupActive = p.keyIsDown(84); // 't' for stir
		const mvx = p.mouseX - p.pmouseX;
		const mvy = p.mouseY - p.pmouseY;
		const frame = p.frameCount;

		for (const tri of filledTris) {
			if (frame >= tri.revealFrame) applyPhysics(tri, mvx, mvy, soupActive);
		}
		for (const tri of middleTris) {
			if (frame >= tri.revealFrame) applyPhysics(tri, mvx, mvy, soupActive);
		}

		p.background(0);

		const ctx = p.drawingContext as CanvasRenderingContext2D;

		for (const tri of filledTris) {
			if (frame < tri.revealFrame) continue;

			const ax1 = tri.x1 + tri.dx,
				ay1 = tri.y1 + tri.dy;
			const ax2 = tri.x2 + tri.dx,
				ay2 = tri.y2 + tri.dy;
			const ax3 = tri.x3 + tri.dx,
				ay3 = tri.y3 + tri.dy;
			const gx2 = (ax2 + ax3) / 2,
				gy2 = (ay2 + ay3) / 2;

			const cx = (ax1 + ax2 + ax3) / 3;
			const cy = (ay1 + ay2 + ay3) / 3;

			// Noise jitter: gives each triangle its own hue offset, drifts slowly over time.
			// At high recursion levels this creates contrast between adjacent tiny triangles.
			const jitter = (p.noise(cx * NOISE_SCALE, cy * NOISE_SCALE, frame * NOISE_TIME) - 0.5) * 120;
			const sat = 70 + p.noise(cx * NOISE_SCALE + 50, cy * NOISE_SCALE + 50) * 30;

			const hue1 = (angleHue(ax1, ay1) + jitter + 360) % 360;
			const hue2 = (hue1 + 80) % 360; // fixed spread so every triangle has a real gradient

			const grad = ctx.createLinearGradient(ax1, ay1, gx2, gy2);
			grad.addColorStop(0, `hsl(${hue1.toFixed(1)}, ${sat.toFixed(1)}%, 55%)`);
			grad.addColorStop(1, `hsl(${hue2.toFixed(1)}, ${sat.toFixed(1)}%, 55%)`);

			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.moveTo(ax1, ay1);
			ctx.lineTo(ax2, ay2);
			ctx.lineTo(ax3, ay3);
			ctx.closePath();
			ctx.fill();
		}

		ctx.fillStyle = '#000';
		for (const tri of middleTris) {
			if (frame < tri.revealFrame) continue;
			ctx.beginPath();
			ctx.moveTo(tri.x1 + tri.dx, tri.y1 + tri.dy);
			ctx.lineTo(tri.x2 + tri.dx, tri.y2 + tri.dy);
			ctx.lineTo(tri.x3 + tri.dx, tri.y3 + tri.dy);
			ctx.closePath();
			ctx.fill();
		}
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
		buildTris();
	};

	p.mouseClicked = () => {
		level = (level % MAX_LEVEL) + 1;
		buildTris();
	};
};