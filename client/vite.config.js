import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // "/api/recentlyreleased" : "http://localhost:4000",
      // "/api/toprated" : "http://localhost:4000",
      // "/api/movie/create" : "http://localhost:4000",
      // "/api/movie/:id" : "http://localhost:4000",
      // "/api/movie/:id/edit" : "http://localhost:4000",
      // "/api/movie/:id/delete" : "http://localhost:4000",
    },
  },
})
