import { LOCAL_STORAGE_KEY } from 'lib/constants';

export default function getCurrentSketch(defaultValue: string) {
	const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (!storedValue) {
		localStorage.setItem(LOCAL_STORAGE_KEY, defaultValue);
		return defaultValue;
	}
	return storedValue;
}
