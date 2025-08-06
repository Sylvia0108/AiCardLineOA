const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 這是我們用來模擬資料庫的陣列
let userDatabase = [];

// --- 中介軟體設定 ---
// 讓 Express 能夠解析傳入的 JSON 格式請求
app.use(express.json());

// 設定靜態檔案資料夾。Express 會從這裡提供前端的檔案 (HTML, CSS, JS)
// path.join 用來產生正確的跨平台路徑
// __dirname 指的是目前檔案 (index.js) 所在的資料夾
app.use(express.static(path.join(__dirname, '../frontend/dist')));


// --- API 路由定義 ---
// 這是我們唯一的 API 端點，用來處理登入/註冊邏輯
// POST 請求到 /api/login
app.post('/api/login', (req, res) => {
    // 從請求的 body 中取得 userId 和 displayName
    const { userId, displayName } = req.body;

    // 基本的錯誤檢查
    if (!userId || !displayName) {
        return res.status(400).json({ message: '請求中缺少 userId 或 displayName' });
    }

    console.log(`[API] 收到請求: UserID=${userId}, DisplayName=${displayName}`);

    const existingUser = userDatabase.find(user => user.userId === userId);

    if (existingUser) {
        console.log(`[DB] 用戶 ${displayName} 已存在，登入成功。`);
        res.json({ status: 'login_success', message: `歡迎回來, ${displayName}!` });
    } else {
        const newUser = { userId, displayName, registeredAt: new Date() };
        userDatabase.push(newUser);
        console.log(`[DB] 新用戶 ${displayName} 註冊成功。`);
        res.json({ status: 'register_success', message: `你好, ${displayName}! 註冊成功！` });
    }
});


// --- 前端路由回退 (Fallback) ---
// 這是一個 "Catch-all" 路由，處理所有其他的 GET 請求
// 它的作用是，無論使用者在瀏覽器輸入什麼路徑，都回傳前端的主頁 (index.html)
// 這樣 React Router 這類的客戶端路由才能正常運作
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


// --- 啟動伺服器 ---
app.listen(port, () => {
    console.log(`後端伺服器已啟動，正在監聽 http://localhost:${port}`);
});