import { URL, fileURLToPath } from 'node:url'

import { createRequire } from 'node:module'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

const _require = createRequire(import.meta.url)

const env = loadEnv('', _require('process').cwd())

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		ReactivityTransform(),
		vueJsx(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
