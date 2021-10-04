export const generateQuery = (input: string, filters: Record<string, string>): string => {
	const titleFilter = filters.title || filters.url;

	const wrappedInput = titleFilter ? titleFilter.replace('replace_me', input) : input;
	const prefix = Object.values(filters)
		.filter((filter: string) => !filter.includes('replace_me'))
		.reduce((prev, curr) => `${prev}${curr}`);
	const query = `${prefix} ${wrappedInput}`;

	return query;
};
