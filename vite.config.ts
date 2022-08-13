import { defineConfig } from "vite";

export default defineConfig({
  base: "/p5js/",
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
