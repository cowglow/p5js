import p5 from 'p5';

interface CanvasDimensions {
	canvasWidth: number;
	canvasHeight: number;
}

export const abstractSketch = (p: p5, cd: CanvasDimensions) => {
	if (cd) {
		const { canvasWidth, canvasHeight } = cd;
		p.createCanvas(canvasWidth, canvasHeight);
		p.colorMode(p.HSB, 360, 100, 100);
		p.background(0);
	}
};
