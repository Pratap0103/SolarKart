import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// Trigger Vite reload to pick up new node_modules
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
