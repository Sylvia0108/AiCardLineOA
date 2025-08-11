import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // 允許 Cloudflare Tunnel 外部訪問
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app'],

    // 設定代理以解決開發時的跨域問題
    proxy: {
      // 將 /api 的請求轉發到後端伺服器
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  },
  
  // 構建配置
  build: {
    // 確保輸出正確的 MIME 類型
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
