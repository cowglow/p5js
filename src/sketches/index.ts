import p5 from 'p5';
import sketch1 from './prototype-001';
import sketch2 from './prototype-002';
import sketch3 from './prototype-003';
import sketch4 from './prototype-004';
import sketch5 from './prototype-005';
import sketch6 from './prototype-006';
import sketch7 from './prototype-007';
import sketch8 from './prototype-008';
import sketch9 from './prototype-009';

export type Sketch = {
	file: string;
	content: (p: p5) => void;
};
export default [
	{ file: 'prototype-001.ts', content: sketch1 },
	{ file: 'prototype-002.ts', content: sketch2 },
	{ file: 'prototype-003.ts', content: sketch3 },
	{ file: 'prototype-004.ts', content: sketch4 },
	{ file: 'prototype-005.ts', content: sketch5 },
	{ file: 'prototype-006.ts', content: sketch6 },
	{ file: 'prototype-007.ts', content: sketch7 },
	{ file: 'prototype-008.ts', content: sketch8 },
	{ file: 'prototype-009.ts', content: sketch9 }
];
