<script lang="ts">
	import RecipeBase from './RecipeBase.svelte';

	let queryTerm = '';
	let queryTermInput = null;

	const handleSearch = () => {
		window.open(
			'https://www.google.com/search?q=' +
				encodeURI(`site:docs.google.com/spreadsheets `) +
				encodeURI(`intitle:"${queryTerm}"`),
			'_blank'
		);
	};
</script>

<RecipeBase
	{handleSearch}
	hoverBgColor="bg-[#11b666]"
	bgColor="bg-[#0F9D58]"
	textColor="text-gray-900"
	inputs={[
		{
			name: 'queryTerm',
			type: 'text',
			placeholder: 'Query',
			ref: queryTermInput,
			handleSearch: handleSearch,
			value: queryTerm,
			handleInput: (e) => {
				queryTerm = e.target.value;
			},
			helperText: 'Example: Startup tools or Angel or Salaries'
		}
	]}
	name="Search public Google Sheets"
/>
