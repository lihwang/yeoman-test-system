import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/sgks_teacher",
  build: {
    outDir: "./sgks_teacher",
  },
  server: {
    port: 3500,
    proxy: {
      "/sgks/": {
        target: "http://121.40.216.86/", //目标请求的地址
        changeOrigin: true,
        cookieDomainRewrite: {
          "*": "", // 将所有域名重写为空，即使用当前域名
        },
        cookiePathRewrite: {
          "*": "/", // 重写所有cookie的路径为根路径
        },
      },
    },
  },
});
