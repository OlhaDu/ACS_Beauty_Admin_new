import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, "index.html"),
  //       nested: resolve(__dirname, "nested/index.html"),
  //     },
  //   },
  // },

  plugins: [
    react(),
    svgr({
      // Опции для SVGR
      svgrOptions: {
        // ...
      },

      // Опции для esbuild
      esbuildOptions: {
        // ...
      },

      // Включить обработку всех файлов SVG с расширением react
      include: "**/*.svg",

      // Исключить какие-либо файлы, если это необходимо
      exclude: "",
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
