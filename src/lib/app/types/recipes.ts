import type { SearchProviderName } from './searchProviders';

export interface RecipeInput {
	name: string;
	type: string;
	placeholder: string;
	shouldHandleSearch: boolean;
	helperText?: string;
}

export interface InputType {
	name: string;
	type: string;
	placeholder: string;
	ref?: HTMLElement;
	handleSearch?: () => void;
	shouldHandleSearch: boolean;
	handleInput?: (e: Event) => void;
	value?: string;
	helperText?: string;
}

export interface RecipeType {
	id: string;
	searchProvider: SearchProviderName;
	hoverBgColor?: string;
	bgColor?: string;
	textColor?: string;
	inputs: RecipeInput[];
	queryTemplate: string;
	name: string;
}
