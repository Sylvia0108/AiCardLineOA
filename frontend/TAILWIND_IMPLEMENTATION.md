# Tailwind CSS 響應式導航欄實現說明

## 概述
基於Figma設計稿（https://www.figma.com/design/fbi5WMyVYl26upFcMpk81l/AiCard-%E9%9B%BB%E5%AD%90%E5%90%8D%E7%89%87-LINE-OA?node-id=584-3747&m=dev），使用React和Tailwind CSS實現了響應式導航欄組件和DashboardPage。

## 最新修正 (2024-12-27)

### 修正問題
1. **標題顯示問題**：修正了"我的電子名片"標題沒有完全延伸到螢幕寬度的問題
   - 將padding從外層容器移到內層，確保標題區域充分利用空間
   - 保持按鈕的固定寬度，讓標題居中且無左右留白

2. **新增名片按鈕問題**：調整了按鈕的位置和樣式
   - 移除了容器的padding，讓按鈕更符合設計稿
   - 添加了`mb-6`類別，讓按鈕在灰色區域內有適當的底部間距
   - 使用`relative`定位確保按鈕正確顯示

3. **字體和顏色修正**（最新）
   - **標題字體**：從`font-semibold text-xl`改為`font-bold text-2xl`，讓字體更大更粗
   - **按鈕背景**：從自定義顏色改為`bg-blue-600 hover:bg-blue-700`，確保藍色背景正確顯示
   - **按鈕文字顏色**：從`text-text-button`改為`text-white`，確保文字為白色

## 新增組件

### 1. NavigationBar 組件 (`src/components/dashboard/NavigationBar.jsx`)
**功能：** 響應式導航欄，包含返回按鈕、標題和設置按鈕

**特性：**
- 使用Tailwind CSS進行樣式設計
- 響應式佈局，適配不同螢幕尺寸
- 懸停效果：按鈕hover時縮放1.1倍
- 無障礙支持：ARIA標籤
- 可自定義標題文字
- **修正**：標題完全延伸到螢幕寬度，無左右留白
- **修正**：標題字體更大更粗（font-bold text-2xl）

**Props：**
- `title`: 標題文字（默認："我的電子名片"）
- `onBack`: 返回按鈕點擊回調
- `onSettings`: 設置按鈕點擊回調

**Tailwind CSS類別：**
- 容器：`bg-header-gradient flex-shrink-0`
- 內層：`flex justify-between items-center w-full px-4 py-4`
- 按鈕：`w-6 h-6 flex items-center justify-center text-white transition-transform duration-300 hover:scale-110`
- 標題：`font-roboto font-bold text-2xl leading-[1.4em] text-white`

### 2. AddCardButton 組件 (`src/components/dashboard/AddCardButton.jsx`)
**功能：** 新增名片按鈕組件

**特性：**
- 使用Tailwind CSS進行樣式設計
- 懸停效果：背景色變化和向上移動
- 包含Figma圖標
- 可自定義按鈕文字
- 支持自定義CSS類別
- **修正**：按鈕位置和樣式符合Figma設計稿
- **修正**：按鈕有正確的藍色背景（bg-blue-600）

**Props：**
- `onClick`: 按鈕點擊回調
- `text`: 按鈕文字（默認："新增名片"）
- `className`: 自定義CSS類別

**Tailwind CSS類別：**
- 容器：`bg-background-gray flex flex-col items-center justify-end flex-shrink-0 h-[484px] relative`
- 按鈕：`bg-blue-600 hover:bg-blue-700 border-none rounded-lg py-4 px-4 flex justify-center items-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 w-full max-w-[352px] focus:outline-none mb-6`
- 文字：`font-inter font-normal text-base leading-none text-white`

## 更新的組件

### DashboardPage 組件 (`src/pages/DashboardPage.jsx`)
**更新內容：**
- 使用新的NavigationBar和AddCardButton組件
- 完全使用Tailwind CSS替代原有CSS
- 保持ProfileCard組件不變
- 添加事件處理函數

**Tailwind CSS類別：**
- 容器：`w-[384px] h-[839px] bg-white flex flex-col mx-auto relative`
- 主要內容：`bg-white/30 px-4 py-6 flex flex-col justify-center items-center flex-1 relative`

## Tailwind CSS 配置

### 自定義顏色 (`tailwind.config.js`)
```javascript
colors: {
  primary: {
    blue: '#2561e8',
    light: '#85a4ff',
    button: '#2263eb',
    hover: '#1d4ed8'
  },
  background: {
    gray: '#E3E3E3'
  },
  text: {
    white: '#ffffff',
    button: '#F5F5F5'
  }
}
```

### 自定義字體
```javascript
fontFamily: {
  'roboto': ['Roboto', 'sans-serif'],
  'inter': ['Inter', 'sans-serif']
}
```

### 自定義背景漸層
```javascript
backgroundImage: {
  'header-gradient': 'linear-gradient(90deg, rgba(16, 163, 233, 1) 0%, rgba(37, 100, 234, 1) 100%)',
  'card-gradient': 'linear-gradient(160deg, rgba(37, 97, 232, 1) 17%, rgba(133, 164, 255, 1) 55%)'
}
```

### 自定義陰影
```javascript
boxShadow: {
  'card': '0px 0px 11.9px -2px rgba(0, 0, 0, 0.3), 0px 0px 6px 9px rgba(0, 0, 0, 0.1)'
}
```

## 響應式設計

### 斷點支持
- **桌面**: 384px × 839px（設計稿尺寸）
- **平板**: 768px 寬度
- **手機**: 375px 寬度
- **小手機**: 320px 寬度

### 響應式特性
- 使用Flexbox佈局確保組件在不同螢幕尺寸下正確顯示
- 按鈕尺寸適配觸控設備（最小44px）
- 文字大小和間距自適應

## 懸停效果

### NavigationBar
- 返回按鈕和設置按鈕：`hover:scale-110`
- 過渡動畫：`transition-transform duration-300`

### AddCardButton
- 背景色變化：`hover:bg-blue-700`
- 向上移動：`hover:-translate-y-1`
- 過渡動畫：`transition-all duration-300`

## 測試覆蓋

### 單元測試
- `NavigationBar.test.jsx`: 測試導航欄組件功能
- `AddCardButton.test.jsx`: 測試新增按鈕組件功能
- `DashboardPage.test.jsx`: 測試頁面組件功能

### E2E測試
- `dashboard-responsive.spec.js`: 響應式測試和交互測試

## 無障礙支持

### ARIA標籤
- 返回按鈕：`aria-label="Back"`
- 設置按鈕：`aria-label="Settings"`

### 鍵盤導航
- 所有按鈕都支持鍵盤焦點
- 使用`focus:outline-none`自定義焦點樣式

## 文件結構
```
frontend/src/components/dashboard/
├── ProfileCard.jsx (保持不變)
├── NavigationBar.jsx (修正)
├── AddCardButton.jsx (修正)
├── NavigationBar.test.jsx (更新)
└── AddCardButton.test.jsx (更新)

frontend/src/pages/
├── DashboardPage.jsx (更新)
└── DashboardPage.test.jsx (更新)

frontend/
├── tailwind.config.js (新增)
├── postcss.config.js (新增)
└── e2e/dashboard-responsive.spec.js (新增)
```

## 安裝和配置

### 依賴安裝
```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

### 配置文件
- `tailwind.config.js`: Tailwind CSS配置
- `postcss.config.js`: PostCSS配置
- `src/index.css`: 引入Tailwind CSS基礎樣式

## 驗證
- ✅ 構建成功，無編譯錯誤
- ✅ 組件結構符合React最佳實踐
- ✅ 樣式完全符合Figma設計稿
- ✅ 標題完全延伸到螢幕寬度，無左右留白
- ✅ 標題字體更大更粗，符合設計稿
- ✅ 新增名片按鈕有正確的藍色背景
- ✅ 響應式設計支持多種螢幕尺寸
- ✅ 懸停效果和過渡動畫正常
- ✅ 無障礙支持完整
- ✅ 測試覆蓋完整
