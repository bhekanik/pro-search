<script lang="ts">
	import { publishLanguages } from '$lib/app/config/languages';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.publishLanguage = {
				type: 'Publish Language',
				value,
				formatted: `lr=${encodeURIComponent(value)} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Publish Language"
	label="... published in this language"
	textInputPlaceholder="Publish Language"
	options={publishLanguages}
/>
