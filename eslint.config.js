/* eslint-env node */

// @ts-check

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import antfu from '@antfu/eslint-config'

import { FlatCompat } from '@eslint/eslintrc'
import oxlint from 'eslint-plugin-oxlint'

// @ts-expect-error env
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import * as globals from 'globals'
import tsEslint from 'typescript-eslint'
import { loadEnv } from 'vite'

// @ts-expect-error meta-property is only allowed environments
const esmMeta = import.meta

const env = loadEnv('', cwd(), '')

// @ts-expect-error env
/** * @type {import('./.eslintrc.json')} */
const jsonConfig = JSON.parse(
	readFileSync(join(esmMeta.dirname, '/.eslintrc.json'), 'utf8'),
)

const eslintrcCompat = new FlatCompat({
	baseDirectory: esmMeta.dirname,
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
	'ts/return-await': 1,
	'perfectionist/sort-named-imports': 0,
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
 * @type import('eslint').Linter.Config['languageOptions']
 */
const languageOptions = {
	globals: {
		...globals.browser,
		...globals.node,
		...jsonConfig.globals,
	},
	parserOptions: {
		extraFileExtensions: jsonConfig.languageOptions.extraFileExtensions,
		parser: tsEslint.parser,
		project: jsonConfig.languageOptions.project,
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: esmMeta.dirname,
		warnOnUnsupportedTypeScriptVersion: false,
	},
}

const defaults = {
	files,
	languageOptions,
	rules,
	ignores: [...jsonConfig.ignorePatterns, '**/.eslintignore', '**/android/**', '**/ios/**']
}


export default antfu(
	{
		ignores: defaults.ignores,
		type: 'lib',
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
			// tsconfigPath: jsonConfig.languageOptions.project,
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

	...eslintrcCompat.plugins('html'),
	oxlint.configs['flat/recommended'], // oxlint should be the last plugin
	{
		rules: defaults.rules,
		ignores: defaults.ignores,
		languageOptions: defaults.languageOptions,
	},
)
