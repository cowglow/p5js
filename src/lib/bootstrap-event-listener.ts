import p5 from 'p5';
import exportCanvas from 'lib/export-canvas';

interface PayloadInterface {
	filename: string;
}

export const bootstrapEventListener = (p: p5, payload: PayloadInterface) => {
	p.keyTyped = () => {
		const { filename } = payload;
		if (p.key === 's') {
			p.saveCanvas(filename, 'png');
		}
		if (p.key === 'p') {
			exportCanvas(filename);
		}
	};
};
