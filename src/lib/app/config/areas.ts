// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { OptionType } from '$lib/components/Filters/Base/Base.svelte';

export const searchAreas: OptionType[] = [
	{ label: '... page title', value: 'title' },
	{ label: '... page body', value: 'body' },
	{ label: '... page URL', value: 'url' },
	{ label: '... page links', value: 'links' }
];
