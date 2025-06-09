import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

const __dirname = path.resolve()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@hook': path.resolve(__dirname, '../src/hook'),
      '@ux': path.resolve(__dirname, '../src/ux'),
      'react-confection': path.resolve(__dirname, '../package/src'),
    },
  },
})