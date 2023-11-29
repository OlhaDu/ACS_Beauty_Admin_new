import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
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
