import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';
export default defineConfig({
  plugins: [react(),tailwindcss(), svgr()],
  resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	base:'/sgks_teacher',
	build: {
    outDir:'./sgks_teacher',
	},
	server: {
		port: 3500,
	}
})
