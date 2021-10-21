<script lang="ts">
	import FilterBase from '$lib/Filter/Base.svelte';
	import { filters } from '../../stores/filters';

	export let go: (e: any) => void = () => null;

	const handleInput = (e: any) => {
		const isCheckbox = e.target.type === 'checkbox';
		const value = isCheckbox ? e.target.checked : e.target.value;
		filters.update((currentFilters) => {
			const newFilters = { ...currentFilters };
			if (!isCheckbox) {
				value ? (newFilters.site = `site:${value} `) : delete newFilters.site;
			} else {
				console.log('value:', value);
				value === false && delete newFilters.site;
			}
			return newFilters;
		});
	};
</script>

<main>
	<FilterBase {handleInput} type="Site" hasInput {go} />
</main>
