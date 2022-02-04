<script lang="ts">
	import RecipeBase from './RecipeBase.svelte';

	let siteUrl = '';
	let siteUrlInput = null;

	let queryTerm = '';
	let queryTermInput = null;

	const handleSearch = () => {
		console.log('Searching for: ' + queryTerm);
		window.open(
			'https://www.google.com/search?q=' + encodeURI(`site:${siteUrl} `) + encodeURI(queryTerm),
			'_blank'
		);
	};
</script>

<RecipeBase
	{handleSearch}
	hoverBgColor="bg-blue-800"
	inputs={[
		{
			name: 'siteUrl',
			type: 'text',
			placeholder: 'Your website. For example, www.example.com',
			ref: siteUrlInput,
			value: siteUrl,
			handleInput: (e) => {
				siteUrl = e.target.value;
			}
		},

		{
			name: 'queryTerm',
			type: 'text',
			placeholder: 'Query',
			ref: queryTermInput,
			handleSearch: handleSearch,
			value: queryTerm,
			handleInput: (e) => {
				queryTerm = e.target.value;
			}
		}
	]}
	name="Search your own website"
/>
