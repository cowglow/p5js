import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
	base: '/p5js/',
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment'
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, './src/components'),
			lib: path.resolve(__dirname, './src/lib'),
			sketches: path.resolve(__dirname, './src/sketches')
		}
	}
});
