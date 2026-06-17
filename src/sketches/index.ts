import p5 from 'p5';

export type Sketch = {
	file: string;
	content: (p: p5) => void;
};

const modules = import.meta.glob<{ default: (p: p5) => void }>('./prototype-*.ts', {
	eager: true,
});

export default Object.entries(modules).map(([path, mod]) => ({
	file: path.replace('./', ''),
	content: mod.default,
}));