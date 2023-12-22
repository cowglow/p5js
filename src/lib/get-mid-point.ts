import p5 from 'p5';

const getAverage = (num1: number, num2: number) => {
	return (num1 + num2) / 2;
};

export const getMidPoint = (p: p5, p1: p5.Vector, p2: p5.Vector) => {
	let xDiff = getAverage(p1.x, p2.x);
	let yDiff = getAverage(p1.y, p2.y);
	return p.createVector(xDiff, yDiff);
};
