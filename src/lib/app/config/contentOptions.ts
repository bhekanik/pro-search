// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { OptionType } from '$lib/components/Filters/Base/Base.svelte';

export const contentOptions: OptionType[] = [
	// { value: 'app', label: 'search for apps' },
	{ value: 'bks', label: 'search for books' },
	{ value: 'isch', label: 'search by image' },
	{ value: 'nws', label: 'news search' },
	{ value: 'pts', label: 'Google patents' },
	{ value: 'shop', label: 'search by shops' },
	{ value: 'vid', label: 'video search' }
];
