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
				value ? (newFilters.exclude = `-${value} `) : delete newFilters.exclude;
			} else {
				value === false && delete newFilters.exclude;
			}
			return newFilters;
		});
	};
</script>

<FilterBase {handleInput} type="Exclude" hasInput {go} />
