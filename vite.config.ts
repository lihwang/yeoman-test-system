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
        secure: false,
        // cookieDomainRewrite: {
        //   "*": "", // 将所有域名重写为空，即使用当前域名
        // },
        // cookiePathRewrite: "/sgks",
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const cookies = proxyRes.headers["set-cookie"];
            if (cookies) {
              // 设置新的过期时间（7天）
              const newExpires = new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toUTCString();

              proxyRes.headers["set-cookie"] = cookies.map((cookie) =>
                cookie
                  .replace(/Domain=[^;]+;/g, "") // 移除域名设置
                  .replace(/Path=\/sgks\/mgt/g, "Path=/") // 特别针对/sgks/mgt路径
                  .replace(/Path=[^;]+;/g, "Path=/;") // 设置根路径
                  .replace(/Expires=[^;]+;/g, `Expires=${newExpires};`)
                  .replace(/Max-Age=[^;]+;/g, "Max-Age=604800;")
              );
            }
          });
        },
      },
    },
  },
});
