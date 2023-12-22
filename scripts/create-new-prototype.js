const { readdir, readFile, writeFile } = require('node:fs/promises');
const path = require('path');

const prototypePath = path.resolve('src/sketches');
const prototypeTemplate = path.resolve('src/templates/prototype-template.ts');

async function run() {
	try {
		const sketchCount = (await readdir(prototypePath)).length;
		const sketchTemplate = await readFile(prototypeTemplate, 'utf8');
		const sketchIndex = ('00' + (sketchCount + 1)).slice(-3);

		await writeFile(
			`${prototypePath}/prototype-${sketchIndex}.ts`,
			sketchTemplate.replace(/xxx/g, sketchIndex),
			'utf8'
		);
	} catch (err) {
		console.error(err);
	}
}

run().then(
	() => console.log('New sketch created, happy coding!'),
	() => console.log('Unable to create new sketch, something went wrong!')
);
