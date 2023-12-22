import p5, { Vector } from 'p5';
import { bootstrapCanvas } from 'lib/bootstrap-canvas';
import { bootstrapEventListener } from 'lib/bootstrap-event-listener';

// Define the minimum and maximum sizes for the SVGs as a percentage of the viewport size
const minSize = 0.1;
const maxSize = 0.25;

// Define the number of times to repeat each SVG in the final layout
const svgRepeatCount = 7;

export default (p: p5) => {
	let svgFiles: p5.SVG[];
	let canvasCenter: Vector;

	// Load all SVG files from the `media` directory and store them in an array
	const loadSVGFiles = () => {
		const svgPaths = p.loadStrings('./media/svg-paths.txt');
		svgFiles = svgPaths.map((path) => p.loadSVG(path));
		console.log('loadSVGFiles');
	};

	/*
    // Create a new random vector within a radius of `maxSize` from the canvas center
    const createRandomVector = () => {
        const randomRadius = p.random(maxSize * p.width * 0.5);
        const randomAngle = p.random(p.TWO_PI);
        const x = canvasCenter.x + randomRadius * p.cos(randomAngle);
        const y = canvasCenter.y + randomRadius * p.sin(randomAngle);
        return new Vector(x, y);
    };
    */

	/*
    // Draw the SVG files on the canvas at random positions and sizes
    const drawSVGFiles = () => {
        const shuffledSVGs = p.shuffle(svgFiles);
        shuffledSVGs.forEach((svg) => {
            for (let i = 0; i < svgRepeatCount; i++) {
                const size = p.random(minSize, maxSize) * p.width;
                const position = createRandomVector();
                p.push();
                p.translate(position.x, position.y);
                p.scale(size / svg.width);
                p.image(svg, 0, 0);
                p.pop();
            }
        });
    };
    */
	bootstrapCanvas(p);
	bootstrapEventListener(p, { filename: 'prototype-010-' + Date.now() });

	p.preload = () => {
		loadSVGFiles();
	};

	p.setup = () => {
		p.colorMode(p.HSB, 360, 100, 100);
		canvasCenter = new Vector(p.width / 2, p.height / 2);
	};

	p.draw = () => {
		p.background(0);
		drawSVGFiles();
	};
};
