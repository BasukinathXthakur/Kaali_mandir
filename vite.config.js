import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react"],
          literature: ["src/data/completeMahabharataData.js"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
   server: {
    proxy: {
      '/api': 'http://localhost:5000', // if testing locally
    },
  },
});
