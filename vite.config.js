// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
//   base: "/myapp/", // 👈 matches the Tomcat context path
//   build: {
//     outDir: "dist",      // build folder
//     assetsDir: "assets", // static assets folder
//   },
//   server: {
//     host: "0.0.0.0",
//     port: 3000,
//     proxy: {
//       "/maximo": {
//         target: "http://192.168.0.73:9080",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/maximo/, ""),
//       },
//     },
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/myapp/", // match your Tomcat context path if deploying there
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    host: "0.0.0.0", // allows access from LAN IPs
    port: 3000,      // you can change if needed
  },
});


