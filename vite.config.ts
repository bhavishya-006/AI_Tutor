import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // GitHub Pages serves static files, so use SPA mode for the frontend.
    spa: {
      enabled: true,
    },
    server: { entry: "server" },
  },
});
