/* eslint-env node */
// @ts-check

import { readFileSync } from 'node:fs'

import { cwd } from 'node:process'
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

import oxlint from 'eslint-plugin-oxlint'

import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import tsEslint from 'typescript-eslint'

/// / @ts-expect-error env config
// import globals from 'globals'
import { loadEnv } from 'vite'

/** * @type {import('./.eslintrc.json')} */
const jsonConfig = JSON.parse(readFileSync('./.eslintrc.json', 'utf-8'))

const env = loadEnv('', cwd(), '')

const eslintrcCompat = new FlatCompat({
	baseDirectory: import.meta.dirname,
})

/**
 * @type import('@antfu/eslint-config').TypedFlatConfigItem['rules']
 */
const antfuRules = {
	'ts/no-unsafe-assignment': 1,
	'ts/use-unknown-in-catch-callback-variable': 1,
	'ts/only-throw-error': 1,
	'ts/prefer-promise-reject-errors': 1,
	'style/max-statements-per-line': 0,
	'node/handle-callback-err': 1,
	'style/indent': [1, 'tab'],
	'style/comma-dangle': 0,
	'antfu/if-newline': 0,
	'style/brace-style': 0,
	'perfectionist/sort-named-imports': 0,
	'perfectionist/sort-imports': 0,
	'ts/strict-boolean-expressions': 1,
	'ts/return-await': 1,
}

/**
 * @type Record<string, any>
 */
const rules = {
	...antfuRules,
	...jsonConfig.rules,
	// allow debugger during development only
	'no-debugger': env.NODE_ENV === 'production' ? 'error' : 'off',
}

const files = ['*.ts', '*.js', '*.vue']

/**
 * @type {import('eslint').Linter.Config['languageOptions']}
 */
const languageOptions = {
	// // @ts-expect-error not assignable to type 'GlobalsConfig'.
	globals: Object.create({
		// ...globals.browser,
		...jsonConfig.globals,
	}),
	parserOptions: {
		extraFileExtensions: jsonConfig.languageOptions.extraFileExtensions,
		parser: tsEslint.parser,
		project: jsonConfig.languageOptions.project,
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: import.meta.dirname,
		warnOnUnsupportedTypeScriptVersion: false,
	},
}

const defaults = {
	files,
	languageOptions,
	rules,
	ignores: [...jsonConfig.ignorePatterns, '**/.eslintignore'],
}

export default antfu(
	{
		// lessOpinionated: true,
		formatters: {
			/**
			 * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
			 * By default uses Prettier
			 */
			css: false,
			/**
			 * Format HTML files
			 * By default uses Prettier
			 */
			html: true,
			/**
			 * Format Markdown files
			 * Supports Prettier and dprint
			 * By default uses Prettier
			 */
			markdown: false,
		},

		jsonc: false,
		markdown: false,
		toml: false,
		yaml: false,
		vue: true,

		typescript: {
			parserOptions: languageOptions?.parserOptions,
		},
		stylistic: {
			indent: 'tab', // 4, or 'tab'
			quotes: 'single', // or 'double'
		},

		plugins: {
			// '@stylistic': stylistic,
			// '@typescript-eslint': tsEslint.plugin,
		},
		// settings: {
		// 	'@typescript-eslint/parser': ['.ts'],
		// 	'import/parsers': {
		// 		espree: ['.js', '.cjs', '.mjs', '.jsx'],
		// 	},
		// 	'import/resolver': {
		// 		typescript: true,
		// 		node: true,
		// 	},
		// },
		// ...defaults,
	},
	// eslintPluginPrettierRecommended,
	// stylistic.configs['recommended-flat'],
	vuejsAccessibility.configs['flat/recommended'],
	defaults,

	// @ts-expect-error
	oxlint.configs['flat/recommended'], // oxlint should be the last one
	...eslintrcCompat.plugins('html'),
	{
		rules: defaults.rules,
		ignores: defaults.ignores,
		languageOptions: defaults.languageOptions,
	},
)
