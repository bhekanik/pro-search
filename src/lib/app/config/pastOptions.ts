// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { OptionType } from '$lib/components/Filters/Base/Base.svelte';

export const pastOptions: OptionType[] = [
	{
		label: '... the past 24 hours',
		value: 'd'
	},
	{
		label: '... the last hour',
		value: 'h'
	},
	{
		label: '... the past 7 days',
		value: 'w'
	},
	{
		label: '... the past month',
		value: 'm'
	},
	{
		label: '... the past 6 months',
		value: 'm6'
	},
	{
		label: '... the past year',
		value: 'y'
	},
	{
		label: '... anytime for all time',
		value: 'all'
	}
];
