import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
	],
	scrollBehavior(to) {
		if (to.hash) {
			return {
				behavior: 'smooth',
				el: to.hash,
				offset: { top: 0, left: 0 }
			}
		}
		return { top: 0, left: 0 }
	}
})



router.onError((error, to) => {
	if (error.message.includes('Failed to fetch dynamically imported module')) {
		Object.assign(window, { location: to.fullPath })
	}
})


export default router
