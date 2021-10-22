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
					? (newQuery.filters.url = {
							value,
							formatted: `inurl:${value}`
					  })
					: delete newQuery.filters.url;
			} else {
				value === false && delete newQuery.filters.url;
			}
			return newQuery;
		});
	};
</script>

<FilterBase {handleInput} type="URL" hasInput value={$query.filters.url?.value} {go} />
