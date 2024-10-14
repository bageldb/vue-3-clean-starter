import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
// import basicSSL from '@vitejs/plugin-basic-ssl'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'



// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// basicSSL(),
		vue(),
		ReactivityTransform(),
		vueDevTools(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
