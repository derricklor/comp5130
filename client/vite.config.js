import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/recentlyreleased" : "http://localhost:4000",
      "/toprated" : "http://localhost:4000",
      "/movie/create" : "http://localhost:4000",
      "/movie/:id" : "http://localhost:4000",
      "/movie/:id/edit" : "http://localhost:4000",
      "/movie/:id/delete" : "http://localhost:4000",
    },
  },
})
