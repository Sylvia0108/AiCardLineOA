# AiCard 專案架構報告

## 📋 專案概述

**專案名稱**: AiCard - 電子名片助理  
**技術架構**: React + Vite + Express + LINE LIFF  
**主要功能**: 基於 LINE LIFF 的電子名片管理應用程式

---

## 🏗️ 整體架構分析

### 1. 前後端分離架構

```
┌─────────────────┐    HTTP API    ┌─────────────────┐
│   Frontend      │ ◄────────────► │    Backend      │
│   (React)       │                │   (Express)     │
│                 │                │                 │
│ - UI Components │                │ - REST API      │
│ - State Mgmt    │                │ - Data Storage  │
│ - Routing       │                │ - Auth Logic    │
└─────────────────┘                └─────────────────┘
```

### 2. 技術棧詳細分析

#### 前端技術棧
- **React 19.1.0**: 主要 UI 框架
- **Vite 7.0.6**: 建構工具和開發伺服器
- **React Router DOM 7.7.1**: 客戶端路由
- **@line/liff 2.27.1**: LINE LIFF SDK
- **Material-UI 7.3.1**: UI 元件庫

#### 後端技術棧
- **Express.js 4.18.3**: Web 框架
- **Node.js**: 運行時環境
- **記憶體陣列**: 模擬資料庫存儲

---

## 🔐 LINE 登入機制與資訊存儲

### 1. LINE LIFF 初始化流程

```javascript
// LiffContext.jsx 中的初始化流程
const initLiff = async () => {
  // 1. 從環境變數獲取 LIFF ID
  const liffId = import.meta.env.VITE_LIFF_ID;
  
  // 2. 初始化 LIFF
  await liff.init({ liffId: liffId.trim() });
  
  // 3. 檢查登入狀態
  if (liff.isLoggedIn()) {
    // 4. 獲取用戶資料
    const profile = await liff.getProfile();
    setUserProfile(profile);
  }
};
```

### 2. 用戶資訊存儲位置

#### 前端存儲 (React State)
```javascript
// LiffContext.jsx 中的狀態管理
const [userProfile, setUserProfile] = useState(null);        // LINE 用戶資料
const [phoneVerified, setPhoneVerified] = useState(null);    // 手機驗證狀態
const [userPhoneNumber, setUserPhoneNumber] = useState(null); // 手機號碼
```

#### 後端存儲 (記憶體陣列)
```javascript
// backend/index.js 中的資料結構
let userDatabase = [
  {
    userId: "U1234567890abcdef",           // LINE 用戶 ID
    displayName: "王小明",                 // LINE 顯示名稱
    phoneVerified: true,                   // 手機驗證狀態
    phoneNumber: "0900000000",             // 手機號碼
    registeredAt: new Date(),              // 註冊時間
    phoneVerifiedAt: new Date()            // 手機驗證時間
  }
];
```

### 3. 資料流程圖

```
LINE Login → LIFF Profile → Frontend State → Backend API → Memory Array
     ↓              ↓              ↓              ↓            ↓
  User Auth    Profile Data   React State   User Data    Persistent
  (Temporary)   (Session)     (Component)   (Request)    (Server)
```

---

## 🔄 Props 傳遞機制分析

### 1. 主要 Props 傳遞路徑

```
App.jsx
  ↓ (profile, onLogout, loading, backendMessage)
DashboardPage.jsx
  ↓ (profile, onLogout, loading, backendMessage)
ProfileCard.jsx
  ↓ (profile, loading)
```

### 2. 詳細 Props 傳遞分析

#### App.jsx → DashboardPage.jsx
```javascript
// App.jsx 中的傳遞
<DashboardPage
  profile={userProfile}           // LINE 用戶資料
  onLogout={handleLogout}         // 登出函數
  loading={loading}               // 載入狀態
  backendMessage={backendMessage} // 後端訊息
/>
```

#### DashboardPage.jsx → ProfileCard.jsx
```javascript
// DashboardPage.jsx 中的傳遞
<ProfileCard 
  profile={profile}               // 用戶資料
  onLogout={onLogout}             // 登出函數
  loading={loading}               // 載入狀態
  backendMessage={backendMessage} // 後端訊息
/>
```

### 3. Context API 使用

#### LiffContext 提供的狀態
```javascript
const value = {
  isLiffReady,                    // LIFF 初始化狀態
  isLoggedIn,                     // 登入狀態
  userProfile,                    // 用戶資料
  phoneVerified,                  // 手機驗證狀態
  loading,                        // 載入狀態
  error,                          // 錯誤訊息
  login,                          // 登入函數
  logout,                         // 登出函數
  setPhoneVerified,               // 設置手機驗證狀態
  checkPhoneVerificationStatus,   // 檢查手機驗證狀態
};
```

---

## 📁 檔案結構分析

### 1. 前端結構
```
frontend/src/
├── components/           # React 元件
│   ├── common/          # 通用元件
│   │   ├── CodeInput.jsx
│   │   ├── LogoutButton.jsx
│   │   └── ...
│   ├── dashboard/       # 儀表板元件
│   │   ├── ProfileCard.jsx
│   │   └── ProfileCard.css
│   ├── layout/          # 佈局元件
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── login/           # 登入元件
│   └── phone/           # 手機驗證元件
├── context/             # React Context
│   ├── LiffContext.jsx  # LIFF 狀態管理
│   └── useLiff.js       # 自定義 Hook
├── pages/               # 頁面元件
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── ...
└── utils/               # 工具函數
    └── userLogger.js
```

### 2. 後端結構
```
backend/
├── index.js             # Express 伺服器主檔案
├── package.json         # 依賴管理
└── package-lock.json    # 依賴鎖定
```

---

## 🔄 狀態管理架構

### 1. 狀態層級分析

#### 全域狀態 (Context)
- **LiffContext**: LINE 登入相關狀態
- **用戶認證狀態**: 登入/登出狀態
- **手機驗證狀態**: 驗證進度追蹤

#### 元件狀態 (Local State)
- **App.jsx**: 應用程式級別狀態
- **ProfileCard.jsx**: 元件級別狀態

### 2. 狀態更新流程

```
User Action → Component → Context → Backend API → State Update → UI Re-render
     ↓           ↓          ↓          ↓            ↓            ↓
  Login      handleLogin  login()   /api/login   setState    ProfileCard
```

---

## 🌐 API 架構分析

### 1. RESTful API 端點

#### 用戶管理 API
```javascript
// 登入/註冊
POST /api/login
Body: { userId, displayName }
Response: { status, message, phoneVerified, user }

// 手機驗證
POST /api/verify-phone
Body: { userId, phoneNumber, verificationCode }
Response: { success, message, user }

// 獲取用戶資料
GET /api/users
Response: { total, users, message }

// 獲取特定用戶
GET /api/users/:userId
Response: { found, user }
```

### 2. 資料驗證機制

#### 前端驗證
```javascript
// 手機號碼格式驗證
const phoneRegex = /^09\d{8}$/;
if (!phoneRegex.test(phoneNumber)) {
  setError("請輸入正確的手機號碼格式");
  return;
}
```

#### 後端驗證
```javascript
// API 參數驗證
if (!userId || !displayName) {
  return res.status(400).json({ 
    message: "請求中缺少 userId 或 displayName" 
  });
}
```

---

## 🔒 安全性考量

### 1. 前端安全措施
- **環境變數**: LIFF ID 透過環境變數管理
- **輸入驗證**: 手機號碼格式驗證
- **錯誤處理**: 統一的錯誤處理機制

### 2. 後端安全措施
- **輸入驗證**: API 請求參數驗證
- **錯誤回應**: 統一的錯誤回應格式
- **CORS**: 跨域請求處理

---

## 📱 PWA 支援

### 1. Service Worker
```javascript
// public/sw.js
// 提供離線支援和快取策略
```

### 2. Manifest 配置
```json
// public/manifest.json
{
  "name": "AiCard",
  "short_name": "AiCard",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

---

## 🚀 部署架構

### 1. 開發環境
- **前端**: http://localhost:5173 (Vite Dev Server)
- **後端**: http://localhost:3000 (Express Server)

### 2. 生產環境
- **靜態檔案**: Express 伺服器提供前端建置檔案
- **API 端點**: 同一個 Express 伺服器處理 API 請求
- **路由回退**: 所有未匹配的路由回傳 index.html

---

## 🔧 開發工具與流程

### 1. 開發指令
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

### 2. 程式碼品質
- **ESLint**: 程式碼檢查和格式化
- **Vite**: 快速開發和建置
- **React DevTools**: 元件調試

---

## 📊 效能優化

### 1. 前端優化
- **程式碼分割**: React Router 懶載入
- **圖片優化**: 響應式圖片載入
- **快取策略**: Service Worker 快取

### 2. 後端優化
- **靜態檔案快取**: Express 靜態檔案快取
- **API 回應優化**: JSON 回應壓縮

---

## 🔮 未來擴展建議

### 1. 功能擴展
- **電子名片管理**: 名片 CRUD 操作
- **分享功能**: 名片分享機制
- **QR Code**: 名片 QR Code 生成
- **多語言支援**: 國際化支援

### 2. 技術擴展
- **資料庫整合**: MongoDB/PostgreSQL
- **快取系統**: Redis 快取
- **檔案上傳**: 圖片上傳功能
- **即時通訊**: WebSocket 整合

---

## 📝 總結

這個專案採用現代化的 React + Express 架構，具有以下特點：

1. **清晰的職責分離**: 前端負責 UI 和用戶互動，後端負責資料處理和 API
2. **完善的狀態管理**: 使用 Context API 管理全域狀態
3. **安全的認證機制**: 整合 LINE LIFF 進行用戶認證
4. **模組化的元件設計**: 可重用的元件結構
5. **PWA 支援**: 提供離線使用能力

整體架構具有良好的可維護性和擴展性，適合進一步的功能開發和優化。
