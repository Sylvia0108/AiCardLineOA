const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// 這是我們用來模擬資料庫的陣列
let userDatabase = [];

// --- 中介軟體設定 ---
// 讓 Express 能夠解析傳入的 JSON 格式請求
app.use(express.json());

// --- 特殊路由：管理頁面 ---
// 在靜態檔案中間件之前處理管理頁面，避免被React Router攔截
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

// --- 特殊路由：Manifest 文件 ---
// 為 manifest.json 設置正確的 MIME type
app.get("/manifest.json", (req, res) => {
  res.setHeader("Content-Type", "application/manifest+json");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(__dirname, "../frontend/public/manifest.json"));
});

// 設定靜態檔案資料夾。Express 會從這裡提供前端的檔案 (HTML, CSS, JS)
// path.join 用來產生正確的跨平台路徑
// __dirname 指的是目前檔案 (index.js) 所在的資料夾
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// --- API 路由定義 ---
// 這是我們唯一的 API 端點，用來處理登入/註冊邏輯
// POST 請求到 /api/login
app.post("/api/login", (req, res) => {
  // 從請求的 body 中取得 userId 和 displayName
  const { userId, displayName } = req.body;

  // 基本的錯誤檢查
  if (!userId || !displayName) {
    return res
      .status(400)
      .json({ message: "請求中缺少 userId 或 displayName" });
  }

  console.log(`[API] 收到請求: UserID=${userId}, DisplayName=${displayName}`);

  const existingUser = userDatabase.find((user) => user.userId === userId);

  if (existingUser) {
    console.log(`[DB] 用戶 ${displayName} 已存在，登入成功。`);
    console.log(`[DB] 當前資料庫用戶數量: ${userDatabase.length}`);
    console.log(
      `[DB] 用戶手機驗證狀態: ${
        existingUser.phoneVerified ? "已驗證" : "未驗證"
      }`
    );

    res.json({
      status: "login_success",
      message: `歡迎回來, ${displayName}!`,
      phoneVerified: existingUser.phoneVerified || false,
      user: {
        userId: existingUser.userId,
        displayName: existingUser.displayName,
        phoneVerified: existingUser.phoneVerified || false,
        phoneNumber: existingUser.phoneNumber || null,
        registeredAt: existingUser.registeredAt,
      },
    });
  } else {
    const newUser = {
      userId,
      displayName,
      phoneVerified: false, // 新用戶預設未驗證手機
      registeredAt: new Date(),
    };
    userDatabase.push(newUser);
    console.log(`[DB] 新用戶 ${displayName} 註冊成功。`);
    console.log(`[DB] 當前資料庫用戶數量: ${userDatabase.length}`);
    console.log(`[DB] 最新用戶資料:`, newUser);

    res.json({
      status: "register_success",
      message: `你好, ${displayName}! 註冊成功！`,
      phoneVerified: false,
      user: newUser,
    });
  }
});

// --- 新增：手機驗證完成API端點 ---
app.post("/api/verify-phone", (req, res) => {
  const { userId, phoneNumber, verificationCode } = req.body;

  // 基本驗證
  if (!userId || !phoneNumber || !verificationCode) {
    return res.status(400).json({
      success: false,
      message: "請求中缺少必要參數",
    });
  }

  console.log(
    `[API] 收到手機驗證請求: UserID=${userId}, Phone=${phoneNumber}, Code=${verificationCode}`
  );

  // 簡單的驗證碼檢查 (實際專案中應該驗證真實的驗證碼)
  if (verificationCode !== "123456") {
    console.log(`[VERIFY] 驗證碼錯誤: ${verificationCode}`);
    return res.status(400).json({
      success: false,
      message: "驗證碼不正確",
    });
  }

  // 找到用戶並更新手機驗證狀態
  const user = userDatabase.find((u) => u.userId === userId);
  if (!user) {
    console.log(`[VERIFY] 用戶不存在: ${userId}`);
    return res.status(404).json({
      success: false,
      message: "用戶不存在",
    });
  }

  // 更新用戶資料
  user.phoneVerified = true;
  user.phoneNumber = phoneNumber;
  user.phoneVerifiedAt = new Date();

  console.log(`[VERIFY] 用戶 ${user.displayName} 手機驗證成功`);
  console.log(`[VERIFY] 更新後的用戶資料:`, user);

  res.json({
    success: true,
    message: "手機驗證成功！",
    user: {
      userId: user.userId,
      displayName: user.displayName,
      phoneVerified: user.phoneVerified,
      phoneNumber: user.phoneNumber,
      phoneVerifiedAt: user.phoneVerifiedAt,
      registeredAt: user.registeredAt,
    },
  });
});

// --- 新增：查看所有用戶資料的API端點 ---
app.get("/api/users", (req, res) => {
  console.log(`[API] 收到查看用戶資料請求`);
  console.log(`[DB] 當前資料庫內容:`, JSON.stringify(userDatabase, null, 2));

  res.json({
    total: userDatabase.length,
    users: userDatabase,
    message: `目前有 ${userDatabase.length} 位用戶`,
  });
});

// --- 新增：清空資料庫的API端點（開發用） ---
app.delete("/api/users", (req, res) => {
  const previousCount = userDatabase.length;
  userDatabase = [];
  console.log(`[DB] 資料庫已清空，刪除了 ${previousCount} 位用戶`);

  res.json({
    message: `已清空資料庫，刪除了 ${previousCount} 位用戶`,
    previousCount,
    currentCount: 0,
  });
});

// --- 新增：查看特定用戶的API端點 ---
app.get("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  const user = userDatabase.find((u) => u.userId === userId);

  if (user) {
    console.log(`[API] 找到用戶:`, user);
    res.json({ found: true, user });
  } else {
    console.log(`[API] 用戶不存在: ${userId}`);
    res.status(404).json({ found: false, message: "用戶不存在" });
  }
});

// --- 新增：即時顯示資料庫狀態的端點 ---
app.get("/api/status", (req, res) => {
  const status = {
    serverTime: new Date().toISOString(),
    totalUsers: userDatabase.length,
    lastRegistration:
      userDatabase.length > 0
        ? userDatabase[userDatabase.length - 1].registeredAt
        : null,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
  };

  console.log(`[STATUS] 伺服器狀態查詢:`, status);
  res.json(status);
});

// --- 前端路由回退 (Fallback) ---
// 這是一個 "Catch-all" 路由，處理所有其他的 GET 請求
// 它的作用是，無論使用者在瀏覽器輸入什麼路徑，都回傳前端的主頁 (index.html)
// 這樣 React Router 這類的客戶端路由才能正常運作
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// --- 啟動伺服器 ---
app.listen(port, () => {
  console.log(`後端伺服器已啟動，正在監聽 http://localhost:${port}`);
});
