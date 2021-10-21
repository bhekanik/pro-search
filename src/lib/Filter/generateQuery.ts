/**
 * Formats the search input for the search engine according to the provided
 * filters
 *
 * @param input The value of the search input
 * @param filters Object containin the selected filters together with their
 * parameters
 * @returns The formated query ready to be sent to the search engine
 */
export const generateQuery = (input: string, filters: Record<string, string>): string => {
	/**
	 * Cannot use title and url together because they wrap around the query term
	 * so prefer to use title and only use url if title doesn't exist
	 *
	 * In future consider using the or (|) operator to be able to use both of
	 * these together
	 */
	const titleFilter = filters.title || filters.url;

	const wrappedInput = titleFilter ? titleFilter.replace('replace_me', input) : input;

	// put the filters together, ensuring to filter out the ones that wrap around
	// the term.
	const prefix = Object.values(filters)
		.filter((filter: string) => !filter.includes('replace_me'))
		.reduce((prev, curr) => `${prev}${curr}`);

	const query = `${prefix} ${wrappedInput}`;

	return query;
};
