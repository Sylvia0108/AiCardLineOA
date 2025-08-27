# AiCard 專案規格文件

## 專案概述

**專案名稱**: AiCard - 電子名片助理  
**版本**: 1.0.0  
**描述**: 基於 LINE LIFF 的電子名片管理應用程式  
**技術架構**: React + Vite + Express + LINE LIFF

## 技術架構

### 前端技術棧
- **框架**: React 19.1.0
- **建構工具**: Vite 7.0.6
- **路由**: React Router DOM 7.7.1
- **UI 框架**: Material-UI 7.3.1
- **樣式**: Emotion (CSS-in-JS)
- **LINE 整合**: @line/liff 2.27.1

### 後端技術棧
- **框架**: Express.js 4.18.3
- **語言**: Node.js
- **資料儲存**: 記憶體陣列 (模擬資料庫)

### 開發工具
- **程式碼檢查**: ESLint 9.30.1
- **並行執行**: concurrently 7.6.0
- **開發伺服器**: Vite Dev Server

## 專案結構

```
AiCard/
├── frontend/                 # 前端應用程式
│   ├── src/
│   │   ├── components/       # React 元件
│   │   │   ├── common/       # 通用元件
│   │   │   ├── dashboard/    # 儀表板元件
│   │   │   ├── layout/       # 佈局元件
│   │   │   ├── login/        # 登入元件
│   │   │   └── phone/        # 手機驗證元件
│   │   ├── context/          # React Context
│   │   ├── pages/            # 頁面元件
│   │   ├── utils/            # 工具函數
│   │   ├── App.jsx           # 主應用程式
│   │   └── main.jsx          # 應用程式入口
│   ├── public/               # 靜態資源
│   ├── package.json          # 前端依賴
│   └── vite.config.js        # Vite 配置
├── backend/                  # 後端 API
│   ├── index.js              # Express 伺服器
│   └── package.json          # 後端依賴
└── package.json              # 根專案配置
```

## 功能模組

### 1. 用戶認證模組
- **LINE LIFF 登入**: 整合 LINE 登入系統
- **手機驗證**: 6位數驗證碼驗證
- **用戶狀態管理**: 登入狀態、驗證狀態追蹤

### 2. 用戶介面模組
- **登入頁面**: 服務條款同意、LINE 登入
- **手機驗證頁面**: 手機號碼輸入、驗證碼輸入
- **儀表板頁面**: 用戶資訊顯示、功能導航
- **下載頁面**: PWA 安裝引導

### 3. API 模組
- **用戶管理 API**: 登入/註冊、手機驗證
- **靜態檔案服務**: 前端檔案、PWA 資源

## 路由結構

### 前端路由
- `/` - 首頁 (登入/儀表板)
- `/liff-login` - LINE 登入重導向
- `/phone-verification` - 手機驗證頁面
- `/dashboard` - 儀表板頁面
- `/download` - 下載頁面
- `/logs` - 記錄頁面

### 後端 API
- `POST /api/login` - 用戶登入/註冊
- `POST /api/verify-phone` - 手機驗證
- `GET /admin.html` - 管理頁面
- `GET /manifest.json` - PWA Manifest

## 資料結構

### 用戶資料結構
```javascript
{
  userId: string,           // LINE 用戶 ID
  displayName: string,      // LINE 顯示名稱
  phoneVerified: boolean,   // 手機驗證狀態
  registeredAt: Date        // 註冊時間
}
```

### 手機驗證資料結構
```javascript
{
  userId: string,           // 用戶 ID
  phoneNumber: string,      // 手機號碼
  verificationCode: string  // 驗證碼
}
```

## 開發環境

### 啟動指令
```bash
# 安裝所有依賴
npm run install:all

# 開發模式 (前端 + 後端)
npm run dev

# 僅前端開發
npm run dev:frontend

# 僅後端開發
npm run start:backend

# 建置生產版本
npm run build
```

### 開發伺服器
- **前端**: http://localhost:5173
- **後端**: http://localhost:3000

## 部署配置

### 前端部署
- **建置輸出**: `frontend/dist/`
- **靜態檔案**: 由 Express 伺服器提供
- **PWA 支援**: Service Worker + Manifest

### 後端部署
- **伺服器**: Express.js
- **靜態檔案**: 提供前端建置檔案
- **API 端點**: RESTful API

## 安全性考量

### 前端安全
- **環境變數**: LIFF ID 透過環境變數管理
- **輸入驗證**: 手機號碼格式驗證
- **錯誤處理**: 統一的錯誤處理機制

### 後端安全
- **輸入驗證**: API 請求參數驗證
- **錯誤回應**: 統一的錯誤回應格式
- **CORS**: 跨域請求處理

## 效能優化

### 前端優化
- **程式碼分割**: React Router 懶載入
- **圖片優化**: 響應式圖片載入
- **快取策略**: Service Worker 快取

### 後端優化
- **靜態檔案快取**: Express 靜態檔案快取
- **API 回應優化**: JSON 回應壓縮

## 測試策略

### 前端測試
- **元件測試**: React 元件單元測試
- **整合測試**: 頁面流程測試
- **E2E 測試**: 用戶操作流程測試

### 後端測試
- **API 測試**: 端點功能測試
- **資料驗證**: 資料結構驗證測試

## 監控與日誌

### 前端監控
- **錯誤追蹤**: 用戶操作錯誤記錄
- **效能監控**: 頁面載入時間追蹤

### 後端監控
- **API 日誌**: 請求/回應日誌記錄
- **錯誤日誌**: 伺服器錯誤記錄
- **用戶活動**: 用戶操作記錄

## 未來擴展

### 功能擴展
- **電子名片管理**: 名片 CRUD 操作
- **分享功能**: 名片分享機制
- **QR Code**: 名片 QR Code 生成
- **多語言支援**: 國際化支援

### 技術擴展
- **資料庫整合**: MongoDB/PostgreSQL
- **快取系統**: Redis 快取
- **檔案上傳**: 圖片上傳功能
- **即時通訊**: WebSocket 整合



