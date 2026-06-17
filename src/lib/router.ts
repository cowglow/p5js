export type Route = { view: 'gallery' } | { view: 'sketch'; file: string };

export function getRoute(): Route {
	const params = new URLSearchParams(window.location.search);
	const file = params.get('sketch');
	if (file) return { view: 'sketch', file };
	return { view: 'gallery' };
}

export function navigateToSketch(file: string) {
	const url = new URL(window.location.href);
	url.searchParams.set('sketch', file);
	history.pushState({}, '', url);
	window.dispatchEvent(new PopStateEvent('popstate'));
}

export function navigateToGallery() {
	const url = new URL(window.location.href);
	url.searchParams.delete('sketch');
	history.pushState({}, '', url);
	window.dispatchEvent(new PopStateEvent('popstate'));
}
