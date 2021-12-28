export enum Operator {
	Exclude = '-',
	Synonym = '~'
}

export function listApplyOperator(value: string, operator: Operator): string {
	return value
		.trim()
		.split(' ')
		.reduce((acc, item) => `${acc}${operator}${item.trim()} `, '');
}
