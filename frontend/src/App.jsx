import { useState, useEffect } from "react";
import liff from "@line/liff";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LiffLoginRedirect from "./pages/LiffLoginRedirect"; // ✅ 新增這行

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

  import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 新增
import liff from "@line/liff";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LiffLoginRedirect from "./pages/LiffLoginRedirect"; // ✅ 保留

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
      setError("");
      liff.login();
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      setProfile(null);
      setBackendMessage("");
      setError("");
      setLoading(true);

      if (liff.isInClient() || liff.isLoggedIn()) {
        liff.logout();
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      localStorage.clear();
      sessionStorage.clear();

      setTimeout(() => {
        window.location.href =
          window.location.origin + window.location.pathname;
      }, 300);
    } catch (error) {
      setError(`登出失敗: ${error.message}`);
      setTimeout(() => window.location.reload(), 1000);
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

  return (
    <Router>
      <Routes>
        {/* 根目錄（/）是你現有的登入 / 首頁流程 */}
        <Route
          path="/"
          element={
            loading ? (
              <div>LIFF 載入中...</div>
            ) : error ? (
              <div className="error">錯誤: {error}</div>
            ) : isLoggedIn ? (
              <DashboardPage
                profile={profile}
                onLogout={handleLogout}
                loading={loading}
                backendMessage={backendMessage}
              />
            ) : (
              <LoginPage
                onLogin={handleLogin}
                error={error}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={setAgreedToTerms}
              />
            )
          }
        />

        {/* ✅ 新增的 liff login 頁面，給 Rich Menu 用的 */}
        <Route path="/liff-login" element={<LiffLoginRedirect />} />
      </Routes>
    </Router>
  );
}




export default App;
