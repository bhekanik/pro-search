<script lang="ts">
	import FilterBase from '$lib/Filter/Base.svelte';
	import { query } from '../../stores/query';

	export let go: (e: any) => void = () => null;

	const handleInput = (e: any) => {
		const isCheckbox = e.target.type === 'checkbox';
		const value = isCheckbox ? e.target.checked : e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			if (!isCheckbox) {
				value
					? (newQuery.filters.site = {
							value,
							formatted: `site:${value} `
					  })
					: delete newQuery.filters.site;
			} else {
				value === false && delete newQuery.filters.site;
			}
			return newQuery;
		});
	};
</script>

<FilterBase {handleInput} type="Site" hasInput value={$query.filters.site?.value} {go} />
