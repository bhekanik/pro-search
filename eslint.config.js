import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
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
				parser: tsParser
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
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				extraFileExtensions: ['.svelte']
			}
		},
		plugins: {
			'@typescript-eslint': ts
		},
		rules: {
			...ts.configs['recommended'].rules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-unused-vars': 'warn'
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
