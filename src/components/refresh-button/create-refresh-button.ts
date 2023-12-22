export default function createRefreshButton(label: string) {
	const button = document.createElement('button');
	button.innerText = label;
	button.addEventListener('click', () => window.location.reload());

	return button;
}
