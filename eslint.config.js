import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node
			}
		},
		rules: {
			'no-unused-vars': 'warn'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			'svelte/no-immutable-reactive-statements': 'warn',
			'svelte/require-each-key': 'warn',
			'svelte/no-useless-mustaches': 'warn',
			'svelte/no-reactive-reassign': 'warn'
		}
	},
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'dist/',
			'node_modules/',
			'*.config.js',
			'*.config.ts',
			'.vercel/',
			'convex/_generated/',
			'.d.ts',
			'cypress/',
			'src/service-worker.ts',
			'convex/auth.config.ts',
			'setup-convex.js',
			'**/*.spec.ts',
			'**/*.test.ts'
		]
	}
];
