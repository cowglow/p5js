import p5 from 'p5';
import { SketchMeta } from './index';
import exportCanvas from 'lib/export-canvas';

export const meta: SketchMeta = {
	title: 'Interference Fields',
	date: '2026-06-18',
	description:
		'Press and drag to place a ring cluster — Y axis controls ring count, X axis controls size. Space floods the canvas. Press r to clear. Press d to delete the last cluster.',
	tags: ['interactive', 'geometry', 'accumulation'],
};

const DRAG_LIMIT = 120;

interface ClusterParams {
	x: number;
	y: number;
	rings: number;
	maxRadius: number;
	weight: number;
	hueShift: number;
}

export default (p: p5) => {
	let buffer: p5.Graphics;
	let running = false;
	let isDragging = false;
	let pressX = 0;
	let pressY = 0;
	let previewWeight = 0.5;
	let clusterMaxRings = 8;
	let clusterMaxRadius = 200;
	let clusterHueShift = 20;
	let clusters: ClusterParams[] = [];

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

	function drawClusterTo(g: p5.Graphics | p5, x: number, y: number, rings: number, maxRadius: number, weight: number, hueShift: number) {
		const baseHue = x % 360;
		const ctx = g.drawingContext as CanvasRenderingContext2D;

		g.noFill();

		const logBase = Math.log(rings + 1);
		for (let i = 1; i <= rings; i++) {
			const outerR = maxRadius * (Math.log(i + 1) / logBase);
			const innerR = maxRadius * (Math.log(i) / logBase);

			const hue = (baseHue + i * hueShift + 360) % 360;
			const sat = p.map(i, 1, rings, 100, 55);
			const bri = p.map(i, 1, rings, 100, 70);
			const alpha = p.map(i, 1, rings, 75, 8);
			const fillAlpha = p.map(i, 1, rings, 35, 4);

			const col = p.color(hue, sat, bri);
			ctx.fillStyle = `rgba(${p.red(col)},${p.green(col)},${p.blue(col)},${fillAlpha / 255})`;
			ctx.beginPath();
			ctx.arc(x, y, outerR, 0, Math.PI * 2, false);
			if (innerR > 0) ctx.arc(x, y, innerR, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

			const ringWeight = weight * (0.4 + 2.5 * Math.abs(Math.sin(i * 1.1)));
			g.strokeWeight(ringWeight);
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
			? clusterMaxRadius
			: p.map(dragX, -DRAG_LIMIT, DRAG_LIMIT, 40, clusterMaxRadius, true);

		return { rings, maxRadius };
	}

	p.draw = () => {
		if (running) {
			const x = p.random(p.windowWidth);
			const y = p.random(p.windowHeight);
			drawClusterTo(buffer, x, y, Math.floor(p.random(3, 14)), p.random(40, p.windowHeight * 0.5), p.random(0.3, 1), p.random(-40, 40));
			p.image(buffer, 0, 0);
			return;
		}

		if (isDragging) {
			const { rings, maxRadius } = getDragParams();
			p.image(buffer, 0, 0);
			drawClusterTo(p, pressX, pressY, rings, maxRadius, previewWeight, clusterHueShift);
		}
	};

	p.mousePressed = () => {
		isDragging = true;
		pressX = p.mouseX;
		pressY = p.mouseY;
		previewWeight = p.random(0.3, 1);
		clusterMaxRings = Math.floor(p.random(6, 14));
		clusterMaxRadius = p.random(40, p.windowHeight * 0.5);
		clusterHueShift = p.random(-40, 40);
		if (!running) {
			p.frameRate(30);
			p.loop();
		}
	};

	p.mouseReleased = () => {
		if (!isDragging) return;
		isDragging = false;
		const { rings, maxRadius } = getDragParams();
		clusters.push({ x: pressX, y: pressY, rings, maxRadius, weight: previewWeight, hueShift: clusterHueShift });
		drawClusterTo(buffer, pressX, pressY, rings, maxRadius, previewWeight, clusterHueShift);
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
			clusters = [];
			buffer.background(0);
			p.background(0);
		}
		if (p.key === 'd') {
			clusters.pop();
			buffer.background(0);
			for (const c of clusters) {
				drawClusterTo(buffer, c.x, c.y, c.rings, c.maxRadius, c.weight, c.hueShift);
			}
			p.image(buffer, 0, 0);
		}
		if (p.key === 's') {
			p.saveCanvas('prototype-009-' + Date.now(), 'png');
		}
		if (p.key === 'p') {
			exportCanvas('prototype-009');
		}
	};
};