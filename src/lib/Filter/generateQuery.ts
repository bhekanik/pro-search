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
	// put the filters together
	const prefix = Object.values(filters).reduce((prev, curr) => `${prev}${curr}`);

	const query = `${prefix} ${input}`;

	return query;
};
