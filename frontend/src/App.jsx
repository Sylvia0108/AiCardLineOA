import { useState, useEffect } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        // 使用 Vite 的環境變數 import.meta.env
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
          sendProfileToBackend(userProfile);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        setError(`LIFF 初始化失敗: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    initializeLiff();
  }, []);

  const handleLogin = () => {
    if (!agreedToTerms) {
      setError("請先閱讀並同意服務條款和隱私政策");
      return;
    }

    if (!liff.isLoggedIn()) {
      setError(""); // 清除之前的錯誤訊息
      liff.login();
    }
  };

  const handleLogout = async () => {
    try {
      console.log("開始登出流程...");

      // 立即更新 UI 狀態，讓用戶看到登出正在進行
      setIsLoggedIn(false);
      setProfile(null);
      setBackendMessage("");
      setError("");
      setLoading(true); // 顯示載入狀態

      // 檢查 LIFF 是否已初始化且用戶已登入
      if (liff.isInClient() || liff.isLoggedIn()) {
        console.log("執行 LIFF 登出...");

        // 嘗試登出，並等待一小段時間確保完成
        await new Promise((resolve) => {
          liff.logout();
          setTimeout(resolve, 200);
        });
      }

      // 清除可能的瀏覽器緩存和本地存儲
      if (typeof Storage !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      console.log("登出完成，重新加載頁面...");

      // 重新加載頁面，確保完全清除狀態
      setTimeout(() => {
        window.location.href =
          window.location.origin + window.location.pathname;
      }, 300);
    } catch (error) {
      console.error("登出過程中發生錯誤:", error);
      setError(`登出失敗: ${error.message}`);

      // 即使出錯也要嘗試重新加載頁面
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const sendProfileToBackend = async (userProfile) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userProfile.userId,
          displayName: userProfile.displayName,
        }),
      });
      const data = await response.json();
      setBackendMessage(data.message);
    } catch (err) {
      setError(`無法連接到後端伺服器: ${err.message}`);
    }
  };

  if (loading) {
    return <div>LIFF 載入中...</div>;
  }

  if (error) {
    return <div className="error">錯誤: {error}</div>;
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="dashboard-container">
          <div className="header">
            <h1 className="app-title">Aipower</h1>
            <p className="app-subtitle">電子名片助理</p>
          </div>

          <div className="profile-card">
            <h2>歡迎使用！</h2>
            {profile && (
              <div className="profile-info">
                <img
                  src={profile.pictureUrl}
                  alt="Profile"
                  className="profile-picture"
                />
                <p className="user-name">{profile.displayName}</p>
                <p className="user-id">ID: {profile.userId}</p>
              </div>
            )}
            <button
              className="logout-button"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "登出中..." : "登出"}
            </button>
            {backendMessage && (
              <p className="status-message">{backendMessage}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="login-page">
          <div className="header">
            <h1 className="app-title">Aipower</h1>
            <p className="app-subtitle">電子名片助理</p>
          </div>

          <div className="login-container">
            <h2 className="welcome-text">歡迎使用</h2>

            <div className="login-card">
              <div className="user-icon-container">
                <div className="user-icon">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="#E3E8F0" />
                    <circle cx="30" cy="22" r="8" fill="white" />
                    <path d="M12 48c0-10 8-18 18-18s18 8 18 18" fill="white" />
                  </svg>
                </div>
                <p className="login-instruction">
                  點擊後，你將會跳轉至 LINE 進行帳號驗證，無需輸入密碼。
                </p>
              </div>

              <div className="terms-container">
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  我已閱讀並同意
                  <a href="#" className="terms-link">
                    服務條款
                  </a>{" "}
                  和
                  <a href="#" className="terms-link">
                    隱私政策
                  </a>
                </label>
              </div>

              {error && <p className="error-message">{error}</p>}

              <button
                className="line-login-button"
                onClick={handleLogin}
                disabled={!agreedToTerms}
              >
                <span className="line-icon">LINE</span>
                使用 LINE 登入
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
