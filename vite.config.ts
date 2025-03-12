import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(), svgr()],
  resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		port: 3500,
		proxy: {
			'/sgks': {
				target: 'https://apifoxmock.com/m1/5825409-5510832-default', //目标请求的地址
				changeOrigin: true
			}
		}
	}
})
