import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'CG Tile Mosaic',
	date: '2022-07-16',
	description:
		'Click to launch a tile layer — four layers at 100%, 66%, 44%, 22% opacity stack with spring physics. Fifth click clears.',
	tags: ['generative', 'tiles', 'brand', 'physics'],
};

const SPRING = 0.05;
const DAMPING = 0.86;
const REPULSION = 0.35;
const WAVE_DELAY = 2;
const HOVER_SCALE = 1.5;
const HOVER_LERP_IN = 0.12;
const HOVER_LERP_OUT = 0.04;

const EXTRA_LAYERS = 3;
const LAYER_START = 2 / 3;
const LAYER_STEP = LAYER_START / EXTRA_LAYERS;
const LAYER_OPACITIES = [1, ...Array.from({ length: EXTRA_LAYERS }, (_, i) => LAYER_START - i * LAYER_STEP)];

interface Tile {
	col: number;
	row: number;
	targetX: number;
	targetY: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	image: p5.Image;
	rotation: number;
	launchFrame: number;
	launched: boolean;
	hoverScale: number;
}

interface Layer {
	tiles: Tile[];
	opacity: number;
}

export default (p: p5) => {
	const tileImages: p5.Image[] = [];
	let layers: Layer[] = [];
	let layerCount = 0;
	let hoveredKey: string | null = null;

	const tileUrls = Object.values(
		import.meta.glob<{ default: string }>('../assets/prototype-006/*.png', { query: '?url', eager: true })
	).map(m => m.default);

	bootstrapCanvas(p, 250);
	bootstrapEventListener(p, { filename: 'prototype-006-' + Date.now() });

	p.preload = () => {
		for (const url of tileUrls) {
			tileImages.push(p.loadImage(url));
		}
	};

	const sketchSetup = p.setup!;
	p.setup = () => {
		sketchSetup();
		(p.drawingContext as CanvasRenderingContext2D).canvas.addEventListener('mouseleave', () => {
			hoveredKey = null;
		});
	};

	function buildTiles(originX: number, originY: number): Tile[] {
		const tileW = tileImages[0].width;
		const tileH = tileImages[0].height;
		const cols = Math.round(p.width / tileW);
		const rows = Math.round(p.height / tileH);
		const originCol = Math.floor(originX / tileW);
		const originRow = Math.floor(originY / tileH);
		const angle = p.random(0, Math.PI);
		const ratio = p.random(1.5, 4);
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const result: Tile[] = [];
		for (let row = 0; row < rows; row++) {
			const rowDensity = Math.random() * (0.9 - 0.5) + 0.5;
			for (let col = 0; col < cols; col++) {
				if (p.random() < rowDensity) continue;
				const dc = col - originCol;
				const dr = row - originRow;
				const u = dc * cos + dr * sin;
				const v = -dc * sin + dr * cos;
				const dist = Math.sqrt((u / ratio) ** 2 + v ** 2);
				const targetX = col * tileW + tileW / 2;
				const targetY = row * tileH + tileH / 2;
				result.push({
					col, row,
					targetX,
					targetY,
					x: targetX + p.random(-tileW, tileW),
					y: targetY + p.random(-tileH, tileH),
					vx: p.random(-2, 2), vy: p.random(-2, 2),
					image: tileImages[Math.floor(p.random(tileImages.length))],
					rotation: randomRotation(),
					launchFrame: p.frameCount + Math.floor(dist * WAVE_DELAY),
					launched: false,
					hoverScale: 1,
				});
			}
		}
		return result;
	}

	p.draw = () => {
		if (tileImages.length === 0) return;
		const tileW = tileImages[0].width;
		const tileH = tileImages[0].height;
		const ctx = p.drawingContext as CanvasRenderingContext2D;

		p.background(250);
		p.imageMode(p.CENTER);

		for (const layer of layers) {
			const unsettled: Tile[] = [];
			for (const tile of layer.tiles) {
				if (!tile.launched && p.frameCount >= tile.launchFrame) tile.launched = true;
				if (tile.launched && !isSettled(tile)) unsettled.push(tile);
			}

			for (let i = 0; i < unsettled.length; i++) {
				for (let j = i + 1; j < unsettled.length; j++) {
					const a = unsettled[i];
					const b = unsettled[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const dist = Math.hypot(dx, dy);
					const minDist = tileW * 0.85;
					if (dist < minDist && dist > 0.1) {
						const force = ((minDist - dist) / minDist) * REPULSION;
						const nx = dx / dist;
						const ny = dy / dist;
						a.vx += force * nx;
						a.vy += force * ny;
						b.vx -= force * nx;
						b.vy -= force * ny;
					}
				}
			}

			ctx.globalAlpha = layer.opacity;

			for (const tile of layer.tiles) {
				if (!tile.launched) continue;

				if (!isSettled(tile)) {
					tile.vx += SPRING * (tile.targetX - tile.x);
					tile.vy += SPRING * (tile.targetY - tile.y);
					tile.vx *= DAMPING;
					tile.vy *= DAMPING;
					tile.x += tile.vx;
					tile.y += tile.vy;
				}

				const key = `${tile.col},${tile.row}`;
				const targetHoverScale = key === hoveredKey ? HOVER_SCALE : 1;
				const lerpRate = targetHoverScale > tile.hoverScale ? HOVER_LERP_IN : HOVER_LERP_OUT;
				tile.hoverScale += (targetHoverScale - tile.hoverScale) * lerpRate;

				p.push();
				p.translate(tile.x, tile.y);
				p.rotate(tile.rotation);
				p.image(tile.image, 0, 0, tileW * tile.hoverScale, tileH * tile.hoverScale);
				p.pop();
			}
		}

		ctx.globalAlpha = 1;
	};

	p.mouseMoved = () => {
		if (tileImages.length === 0) return;
		const col = Math.floor(p.mouseX / tileImages[0].width);
		const row = Math.floor(p.mouseY / tileImages[0].height);
		hoveredKey = `${col},${row}`;
	};

	p.mouseClicked = () => {
		if (tileImages.length === 0) return;

		if (layerCount === 4) {
			layers = [];
			layerCount = 0;
			hoveredKey = null;
			return;
		}

		layers.push({ tiles: buildTiles(p.mouseX, p.mouseY), opacity: LAYER_OPACITIES[layerCount] });
		layerCount++;
	};
};

function isSettled(tile: Tile): boolean {
	return Math.hypot(tile.targetX - tile.x, tile.targetY - tile.y) < 1 &&
		Math.hypot(tile.vx, tile.vy) < 0.5;
}

function randomRotation() {
	return (Math.floor(Math.random() * 8) * Math.PI) / 4;
}
