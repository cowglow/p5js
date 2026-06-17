import p5 from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';
import CharacterColumn from '../classes/character-column';
import { SketchMeta } from './index';

export const meta: SketchMeta = {
	title: 'Umlaut Matrix',
	date: '2022-07-09',
	description:
		'Columns of falling umlaut characters cascade down the screen at randomized speeds and lengths, creating a continuous ambient loop.',
	tags: ['generative', 'animation', 'ambient', 'text']
};

export default (p: p5) => {
	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-005-' + Date.now() });

	const frameInterval = 2;
	const charSize = 14;

	const columns: CharacterColumn[] = [];
	for (let i = 0; i <= p.windowWidth / charSize; ++i) {
		const charColumn = new CharacterColumn(
			p,
			charSize,
			charSize * i,
			-p.windowHeight,
			Math.floor(p.random(frameInterval, frameInterval * charSize)),
			Math.floor(p.random(18, p.windowHeight / charSize))
		);
		columns.push(charColumn);
	}

	p.draw = () => {
		if (p.frameCount % frameInterval == 1) {
			p.background(0, 0.66);
			columns.forEach((column) => {
				column.displayColumn();
			});
		}
	};
};
