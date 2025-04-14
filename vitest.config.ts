import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["__tests__/**/*.test.tsx", "tests/**/*.test.tsx"],

    deps: {
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  esbuild: {
    jsx: "automatic", 
  },
});
