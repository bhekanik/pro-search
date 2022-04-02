<script lang="ts">
	import { googleCountries, googleDomains, googlePageLanguages } from '$lib/app/fixtures';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			const domain =
				googleDomains.find((domain) => domain.countryCode === value) ||
				googleDomains.find((domain) => domain.countryCode === 'us');
			const language =
				googlePageLanguages.find((language) => language.value === domain?.languageCode)?.value ||
				'en';
			newQuery.filters.locale = {
				type: 'Locale',
				value,
				formatted: `gl=${encodeURIComponent(value)}&hl=${encodeURIComponent(
					language
				)}&google_domain=${encodeURIComponent(domain?.domain || '')}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Locale"
	label="Use this locale"
	textInputPlaceholder="Locale"
	options={googleCountries}
/>
