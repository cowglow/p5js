import { LOCAL_STORAGE_KEY } from 'lib/constants';

export default function changeDropdownOption(selectedOption: string) {
	localStorage.setItem(LOCAL_STORAGE_KEY, selectedOption);
	window.location.reload();
}
