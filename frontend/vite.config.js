import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/tareas':'http://localhost:3001',
      '/comentarios':'http://localhost:3001',
      '/usuarios':'http://localhost:3001',
      '/imagenes':'http://localhost:3001',
    }
  }
})
