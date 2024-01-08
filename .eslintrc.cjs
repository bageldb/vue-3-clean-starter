/**
//  *@type {import('eslint').Linter.configType}
 */
module.exports = {
	// https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
	// This option interrupts the configuration hierarchy at this file
	// Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
	root: true,

	// https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
	// Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
	// `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
	parserOptions: {
		parser: '@typescript-eslint/parser',
		extraFileExtensions: ['.vue'],
		project: 'tsconfig.app.json',
		tsconfigRootDir: __dirname,
		// parser: {
		//   ts: "@typescript-eslint/parser",
		//   "<template>": "espree",
		// },
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},

	env: {
		browser: true,
		es2021: true,
		node: true,
		'vue/setup-compiler-macros': true,
	},
	ignorePatterns: ['node_modules', 'dist', 'build', 'public'],

	// Rules order is important, please avoid shuffling them
	extends: [
		// Base ESLint recommended rules
		// 'eslint:recommended',

		// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
		// ESLint typescript rules
		// 'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',

		// Uncomment any of the lines below to choose desired strictness,
		// but leave only one uncommented!
		// See https://eslint.vuejs.org/rules/#available-rules
		'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
		// 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
		// 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

		'airbnb-base',
		'plugin:vuejs-accessibility/recommended',
	],

	plugins: [
		// required to apply rules which need type information
		'@typescript-eslint',
		'@stylistic/js',

		// https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
		// required to lint *.vue files
		'vue',
	],

	globals: {
		$ref: 'readonly',
		$computed: 'readonly',
		$i18n: 'readonly',
	},

	// add your custom rules here
	rules: {
		'max-len': ['warn', { code: 120, ignoreComments: true }],
		indent: 0,
		'no-tabs': 0,
		'operator-linebreak': 0,
		'no-spaced-func': 0,
		'func-call-spacing': 0,
		'@stylistic/js/no-tabs': 0,
		'no-useless-catch': 0,
		'no-restricted-syntax': 0,
		'no-console': 0,
		'@stylistic/js/no-mixed-spaces-and-tabs': 0,
		'@stylistic/js/lines-between-class-members': 0,
		camelcase: 0,

		'import/no-cycle': 1,
		'new-cap': 1,
		eqeqeq: 1,
		radix: 1,
		'no-empty': 1,
		'no-empty-pattern': 1,
		'no-prototype-builtins': 1,
		'no-multi-assign': 1,
		'class-methods-use-this': 1,
		'guard-for-in': 1,
		'default-case': 1,
		// 'no-unused-expressions': {
		// 	allowShortCircuit: true,
		// 	allowTernary: true
		// },
		'no-undef': 1,
		'prefer-destructuring': 1,
		'no-useless-escape': 1,
		'no-shadow': 1,
		'no-sequences': 1,
		'no-cond-assign': 1,
		'no-await-in-loop': 1,
		'no-restricted-globals': 1,
		// 'no-return-await': 1,
		'no-underscore-dangle': 0,
		'no-param-reassign': 0,
		'no-void': 0,
		'no-nested-ternary': 0,
		'max-classes-per-file': 0,
		'no-return-assign': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,
		'prefer-promise-reject-errors': 0,
		'no-plusplus': 0,
		'import/first': 0,
		'import/no-relative-packages': 0,

		'no-restricted-properties': 1,
		'no-use-before-define': 1,
		// '@stylistic/js/eol-last': 1,
		'@stylistic/js/no-trailing-spaces': 1,
		'@stylistic/js/no-multiple-empty-lines': 1,
		'@stylistic/js/operator-linebreak': 1,
		'@stylistic/js/max-len': ['warn', { code: 120, ignoreComments: true }],
		// '@stylistic/js/comma-dangle': 1,
		'@stylistic/js/implicit-arrow-linebreak': 1,
		'@stylistic/js/indent': [1, 'tab'],
		// '@stylistic/js/quotes': [
		// 	1,
		// 	'single',
		// 	{
		// 		avoidEscape: true,
		// 	},
		// ],
		// The core "no-unused-vars" rules (in the eslint:recommended ruleset)
		// does not work with type definitions
		'no-unused-vars': 1,
		'import/named': 1,
		'no-redeclare': 1,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,
		'consistent-return': [
			'warn',
			{
				treatUndefinedAsUnspecified: false,
			},
		],
		'vue/valid-v-on': 0,
		'vue/v-on-event-hyphenation': 0,
		// 'vue-scoped-css/no-unused-selector': 0,
		// 'vue-scoped-css/enforce-style-type': 0,
		'vue/attribute-hyphenation': 0,
		'vue/no-useless-template-attributes': 0,
		'vue/multi-word-component-names': 0,
		'vue/html-indent': [
			'warn',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: [],
			},
		],
		'vue/no-dupe-keys': 1,
		'vue/no-v-text-v-html-on-component': 1,
		'vue/first-attribute-linebreak': 1,
		'vue/no-reserved-component-names': 1,
		// "vue/no-parsing-error": 1,
		'vue/no-mutating-props': 1,
		'vue/no-unused-vars': 1,
		'vue/html-self-closing': 1,
		'vue/singleline-html-element-content-newline': 1,
		'vue/multiline-html-element-content-newline': 1,
		'vue/block-tag-newline': 2,
		'vue/html-closing-bracket-newline': [
			1,
			{
				singleline: 'never',
				multiline: 'always',
			},
		],
		'vue/prefer-template': 2,
		// TypeScript
		// this rule, if on, would require explicit return type on the `render` function
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-unsafe-member-access': 0,
		'@typescript-eslint/no-unsafe-return': 0,
		'@typescript-eslint/no-unsafe-argument': 0,
		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/no-unsafe-call': 0,
		'@typescript-eslint/restrict-template-expressions': 0,
		'@typescript-eslint/no-misused-promises': 0,
		'@typescript-eslint/no-explicit-any': 1,
		'@typescript-eslint/unbound-method': 1,
		'@typescript-eslint/ban-ts-comment': 1,
		'@typescript-eslint/no-shadow': 1,
		'@typescript-eslint/require-await': 1,
		'@typescript-eslint/no-empty-function': 1,
		'@typescript-eslint/no-empty-interface': 1,
		'@typescript-eslint/no-unused-vars': 1,

		// in plain CommonJS modules, you can"t use `import foo = require("foo")` to pass this rule, so it has to be disabled
		'@typescript-eslint/no-var-requires': 'off',
		'vuejs-accessibility/click-events-have-key-events': 0,
		'vuejs-accessibility/no-static-element-interactions': 0,
		'vuejs-accessibility/form-control-has-label': 0,
		'vuejs-accessibility/label-has-for': 0,
		// allow debugger during development only
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
};
