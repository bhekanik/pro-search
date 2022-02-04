<script lang="ts">
	import RecipeBase from './RecipeBase.svelte';

	let queryTerm = '';
	let queryTermInput = null;

	let url = '';
	$: {
		url = `https://www.google.com/search?q=${encodeURI(
			`site:twitter.com ${queryTerm.replace('#', '')}`
		)}`;
	}

	const handleSearch = () => {
		window.open(url, '_blank');
	};
</script>

<RecipeBase
	{handleSearch}
	hoverBgColor="bg-[#49b1f1]"
	bgColor="bg-[#1DA1F2]"
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
			helperText: 'Example: @jack startsmall join'
		}
	]}
	name="Search on Twitter"
/>
