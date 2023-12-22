export default function createTitleLabel(label: string) {
	const [name] = label.split('.');
	const [sketch, index] = name.split('-');
	return `${sketch} ${index}`;
}
