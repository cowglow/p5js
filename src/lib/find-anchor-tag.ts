// TODO: Correct typing
export const findAnchorTag = (element: HTMLElement | null): any => {
	if (element) {
		if (element.tagName === 'HTML') return null;
		if (element.tagName === 'A') return element;
		else {
			return findAnchorTag(element.parentElement);
		}
	}
};
