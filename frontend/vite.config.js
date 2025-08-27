import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- 請加入或修改這個 server 物件 ---
  server: {
    hmr: false, // 關閉 HMR 功能來避免 WebSocket 問題
    watch: false, // 完全關閉檔案監控
    allowedHosts: [
      // 這是解決問題的關鍵設定
      // 允許所有來自 loca.lt 的子網域連線
      '.loca.lt',
      // 允許所有來自 trycloudflare.com 的子網域連線
      '.trycloudflare.com',
      // 允許所有主機（開發環境使用）
      'all'
    ],
    // 新增這些設定來解決 WebSocket 問題
    host: '0.0.0.0',
    port: 5173,
  }
})