<script lang="ts">
	import FilterBase from '$lib/Filter/Base.svelte';
	import { query } from '../../stores/query';

	export let go: (e: any) => void = () => null;

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.exclude = {
						value,
						formatted: `-${value} `
				  })
				: delete newQuery.filters.exclude;
			return newQuery;
		});
	};
</script>

<FilterBase on:input={handleInput} type="Exclude" hasInput on:keydown={go} />
