import p5 from 'p5';

export type SketchMeta = {
	title: string;
	date: string;
	description: string;
	tags: string[];
};

export type Sketch = {
	file: string;
	content: (p: p5) => void;
	meta: SketchMeta;
};

const modules = import.meta.glob<{ default: (p: p5) => void; meta: SketchMeta }>(
	'./prototype-*.ts',
	{ eager: true }
);

export default Object.entries(modules).map(([path, mod]) => ({
	file: path.replace('./', ''),
	content: mod.default,
	meta: mod.meta,
}));
