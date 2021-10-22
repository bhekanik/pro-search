<script lang="ts">
	import FilterBase from '$lib/Filter/Base.svelte';
	import { query } from '../../stores/query';

	export let go: (e: any) => void = () => null;

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.url = {
						value,
						formatted: `inurl:${value}`
				  })
				: delete newQuery.filters.url;
			return newQuery;
		});
	};
</script>

<FilterBase {handleInput} type="URL" hasInput {go} />
