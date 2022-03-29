export enum Operator {
	Exclude = '-',
	Synonym = '~'
}

export enum QueryKeys {
	as_eq = 'as_eq',
	excludeSite = '-site'
}

export function listApplyOperator(value: string, operator: Operator): string {
	return value
		.trim()
		.split(' ')
		.reduce((acc, item) => `${acc}${operator}${item.trim()} `, '');
}

export function listCreateParams(value: string, queryKey: QueryKeys): string {
	if (queryKey === QueryKeys.excludeSite) {
		return value
			.trim()
			.replace(/\s{2,}/g, ' ')
			.split(' ')
			.reduce(
				(acc, item, index, array) =>
					`${acc}${`${queryKey}`}:${encodeURIComponent(item.trim())}${
						index !== array.length - 1 ? '+' : ''
					}`,
				''
			);
	}
	return value
		.trim()
		.split(' ')
		.reduce((acc, item) => `${acc}${queryKey}=${encodeURIComponent(item.trim())}&`, '');
}
