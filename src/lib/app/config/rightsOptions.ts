// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { OptionType } from '$lib/components/Filters/Base/Base.svelte';

export const rightsOptions: OptionType[] = [
	{
		value: '(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived)',
		label: 'free to use or share'
	},
	{
		value: '(cc_publicdomain|cc_attribute|cc_sharealike|cc_nonderived).-(cc_noncommercial)',
		label: 'free to use or share, including commercially'
	},
	{
		value: '(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial).-(cc_nonderived)',
		label: 'free to use, share, or modify'
	},
	{
		value: '(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)',
		label: 'free to use, share, or modify commercially'
	}
];
