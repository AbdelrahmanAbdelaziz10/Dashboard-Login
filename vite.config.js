import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    proxy: {
      // Any request starting with /maximo will go to your backend server
      "/maximo": {
        target: "http://192.168.0.73:9080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/maximo/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
