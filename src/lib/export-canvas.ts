import getTimestamp from 'lib/get-timestamp';

export default function exportCanvas(fileName: string) {
	const canvasElement = document.querySelector<HTMLCanvasElement>('canvas');
	if (!canvasElement) {
		console.error('Canvas element is not defined');
		return;
	}
	const MIME_TYPE = 'image/png';
	const imgURL = canvasElement.toDataURL(MIME_TYPE);
	const downloadLink = document.createElement('a');
	downloadLink.download = `${fileName}-${getTimestamp()}.png`;
	downloadLink.href = imgURL;
	downloadLink.dataset.downloadurl = [MIME_TYPE, downloadLink.download, downloadLink.href].join(
		':'
	);
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}
