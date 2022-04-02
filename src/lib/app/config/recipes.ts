import type { RecipeType } from '../types';

export const recipes: RecipeType[] = [
	{
		id: '1',
		searchProvider: 'Google',
		hoverBgColor: 'hover:bg-blue-800',
		inputs: [
			{
				name: 'siteUrl',
				type: 'url',
				placeholder: 'www.example.com',
				shouldHandleSearch: false
			},
			{
				name: 'queryTerm',
				type: 'text',
				placeholder: 'Query',
				shouldHandleSearch: true
			}
		],
		queryTemplate: `site:{{siteUrl}} {{queryTerm}}`,
		name: 'Search your own site'
	},
	{
		id: '2',
		name: 'Search on Twitter',
		hoverBgColor: 'hover:bg-[#49b1f1]',
		bgColor: 'bg-[#1DA1F2]',
		textColor: 'text-gray-900',
		searchProvider: 'Google',
		queryTemplate: `site:twitter.com {{queryTerm}}`,
		inputs: [
			{
				name: 'queryTerm',
				type: 'text',
				placeholder: 'Query',
				shouldHandleSearch: true,
				helperText: 'Example: @jack #startsmall join'
			}
		]
	},
	{
		id: '3',
		hoverBgColor: 'hover:bg-[#11b666]',
		bgColor: 'bg-[#0F9D58]',
		textColor: 'text-gray-900',
		queryTemplate: `site:docs.google.com/spreadsheets intitle:"{{queryTerm}}"`,
		searchProvider: 'Google',
		name: 'Search public Google Sheets',
		inputs: [
			{
				name: 'queryTerm',
				type: 'text',
				placeholder: 'Query',
				shouldHandleSearch: true,
				helperText: 'Example: Startup tools or Angel or Salaries'
			}
		]
	},
	{
		id: '4',
		hoverBgColor: 'hover:bg-[#e2eabf]',
		bgColor: 'bg-[#e2ea62]',
		textColor: 'text-gray-900',
		queryTemplate: `"{{queryTerm}}" cheat sheet filetype:pdf`,
		searchProvider: 'Google',
		name: 'Find cheatsheets for any topic',
		inputs: [
			{
				name: 'queryTerm',
				type: 'text',
				placeholder: 'Topic',
				shouldHandleSearch: true,
				helperText: 'Example: Calculus'
			}
		]
	}
];
