export enum Operator {
	Exclude = '-',
	Synonym = '~'
}

export enum QueryKeys {
	as_eq = 'as_eq'
}

export function listApplyOperator(value: string, operator: Operator): string {
	return value
		.trim()
		.split(' ')
		.reduce((acc, item) => `${acc}${operator}${item.trim()} `, '');
}

export function listCreateParams(value: string, queryKey: QueryKeys): string {
	return value
		.trim()
		.split(' ')
		.reduce((acc, item) => `${acc}${queryKey}=${encodeURIComponent(item.trim())}&`, '');
}
