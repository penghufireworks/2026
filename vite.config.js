import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 將 base 改為 '/' 或 './'
  // 既然你有自定義網域，使用 '/' 是最標準的做法
  base: '/', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, 
    port: 5173, 
    strictPort: false, 
  }
})
