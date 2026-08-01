import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Relative base so the build works when hosted in a GitHub Pages
// project subfolder (e.g. username.github.io/repo-name/) as well as
// at a domain root. Revisit in Phase 8 if a custom domain is used.
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@sections": path.resolve(__dirname, "./src/sections"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  build: {
    target: "es2020",
    // Keep an eye on this in Phase 8 -- particle/canvas-heavy sections
    // may warrant manual chunking so the initial cinematic loads fast.
    chunkSizeWarningLimit: 800,
  },
});
