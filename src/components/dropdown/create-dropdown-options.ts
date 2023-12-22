import { Sketch } from 'sketches';

export default function createDropdownOptions(sketches: Sketch[]) {
	return sketches.map((sketch) => sketch.file);
}
