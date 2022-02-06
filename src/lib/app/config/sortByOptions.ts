// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { OptionType } from '$lib/components/Filters/Base/Base.svelte';

export const sortByOptions: OptionType[] = [
	{ label: 'Date', value: 'sbd:1' },
	{ label: 'Relevance', value: 'sbd:0' }
];
