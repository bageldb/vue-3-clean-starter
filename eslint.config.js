/* eslint-env node */

// @ts-check
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

// eslint-disable-next-line import/namespace
import { loadEnv } from 'vite'

// eslint-disable-next-line import/namespace, import/default
import antfu from '@antfu/eslint-config'

// @ts-expect-error env config
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
// @ts-expect-error env config
import globals from 'globals'
// @ts-expect-error env config
import oxlint from 'eslint-plugin-oxlint'
import tsEslint from 'typescript-eslint'

import { FlatCompat } from '@eslint/eslintrc'

/** * @type import('./.eslintrc.json') */
const jsonConfig = JSON.parse(readFileSync('./.eslintrc.json', 'utf-8'))

// @ts-expect-error env config
const _require = createRequire(import.meta.url)
const env = loadEnv('', _require('process').cwd(), '')

const eslintrcCompat = new FlatCompat({
	// @ts-expect-error env config
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
	'ts/strict-boolean-expressions': 1,
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
 * @type import('eslint').Linter.FlatConfig['languageOptions']
 */
const languageOptions = {
	// // @ts-expect-error not assignable to type 'GlobalsConfig'.
	globals: {
		...globals.browser,
		...jsonConfig.globals,
	},
	parserOptions: {
		extraFileExtensions: jsonConfig.languageOptions.extraFileExtensions,
		parser: tsEslint.parser,
		project: ['tsconfig.json', 'tsconfig.app.json'],
		ecmaVersion: 'latest',
		sourceType: 'module',
		// @ts-expect-error env config
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
			tsconfigPath: ['tsconfig.json', 'tsconfig.app.json'],
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
	Object(vuejsAccessibility.configs['flat/recommended']),
	defaults,

	Object(oxlint.configs['flat/recommended']), // oxlint should be the last one

	...eslintrcCompat.plugins(
		// 'vue',
		'html'
		// ...jsonConfig.plugins
	),
	{
		rules: defaults.rules,
		ignores: defaults.ignores,
		languageOptions: defaults.languageOptions,
	}
)
