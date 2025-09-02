import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['theme-change', 'fast-fuzzy', 'qrcode']
	},
	server: {
		fs: {
			allow: ['..']
		}
	}
});
