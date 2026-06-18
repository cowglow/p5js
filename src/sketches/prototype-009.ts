import p5 from 'p5';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Interference Fields',
	date: '2026-06-18',
	description:
		'Press and drag to place a ring cluster — Y axis controls ring count, X axis controls size. Space floods the canvas. Press r to clear.',
	tags: ['interactive', 'geometry', 'accumulation'],
};

const DRAG_LIMIT = 120;

export default (p: p5) => {
	let buffer: p5.Graphics;
	let running = false;
	let isDragging = false;
	let pressX = 0;
	let pressY = 0;
	let previewWeight = 0.5;
	let clusterMaxRings = 8;
	let clusterMaxRadius = 200;

	p.setup = () => {
		p.frameRate(30);
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.colorMode(p.HSB, 360, 100, 100);
		p.background(0);
		buffer = p.createGraphics(p.windowWidth, p.windowHeight);
		buffer.colorMode(buffer.HSB, 360, 100, 100);
		buffer.background(0);
		p.noLoop();
	};

	function drawClusterTo(g: p5.Graphics | p5, x: number, y: number, rings: number, maxRadius: number, weight: number) {
		const hue = x % 360;
		const ctx = g.drawingContext as CanvasRenderingContext2D;

		g.strokeWeight(weight);
		g.noFill();

		for (let i = 1; i <= rings; i++) {
			const outerR = (maxRadius / rings) * i;
			const innerR = (maxRadius / rings) * (i - 1);
			const alpha = p.map(i, 1, rings, 45, 3);
			const sat = p.map(i, 1, rings, 70, 10);

			const col = p.color(hue, sat, 80);
			ctx.fillStyle = `rgba(${p.red(col)},${p.green(col)},${p.blue(col)},${5 / 255})`;
			ctx.beginPath();
			ctx.arc(x, y, outerR, 0, Math.PI * 2, false);
			if (innerR > 0) ctx.arc(x, y, innerR, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

			g.stroke(hue, sat, 100, alpha);
			g.circle(x, y, outerR * 2);
		}

		g.strokeWeight(1);
	}

	function getDragParams() {
		const dragX = p.mouseX - pressX;
		const dragY = pressY - p.mouseY;
		const isQuickClick = Math.abs(dragX) < 10 && Math.abs(dragY) < 10;

		const rings = isQuickClick
			? Math.floor(p.random(3, clusterMaxRings + 1))
			: Math.floor(p.map(dragY, -DRAG_LIMIT, DRAG_LIMIT, 2, clusterMaxRings, true));

		const maxRadius = isQuickClick
			? p.random(40, clusterMaxRadius)
			: p.map(dragX, -DRAG_LIMIT, DRAG_LIMIT, 40, clusterMaxRadius, true);

		return { rings, maxRadius };
	}

	p.draw = () => {
		if (running) {
			const x = p.random(p.windowWidth);
			const y = p.random(p.windowHeight);
			drawClusterTo(buffer, x, y, Math.floor(p.random(3, 14)), p.random(40, p.windowHeight * 0.5), p.random(0.3, 1));
			p.image(buffer, 0, 0);
			return;
		}

		if (isDragging) {
			const { rings, maxRadius } = getDragParams();
			p.image(buffer, 0, 0);
			drawClusterTo(p, pressX, pressY, rings, maxRadius, previewWeight);
		}
	};

	p.mousePressed = () => {
		isDragging = true;
		pressX = p.mouseX;
		pressY = p.mouseY;
		previewWeight = p.random(0.3, 1);
		clusterMaxRings = Math.floor(p.random(6, 14));
		clusterMaxRadius = p.random(40, p.windowHeight * 0.5);
		if (!running) {
			p.frameRate(30);
			p.loop();
		}
	};

	p.mouseReleased = () => {
		if (!isDragging) return;
		isDragging = false;
		const { rings, maxRadius } = getDragParams();
		drawClusterTo(buffer, pressX, pressY, rings, maxRadius, previewWeight);
		p.image(buffer, 0, 0);
		if (!running) p.noLoop();
	};

	p.keyPressed = () => {
		if (p.key === ' ') {
			running = !running;
			if (running) {
				p.frameRate(6);
				p.loop();
			} else {
				p.noLoop();
			}
		}
		if (p.key === 'r') {
			buffer.background(0);
			p.background(0);
		}
		if (p.key === 's') {
			p.saveCanvas('prototype-009-' + Date.now(), 'png');
		}
	};
};