import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 新增 Router
import liff from "@line/liff";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LiffLoginRedirect from "./pages/LiffLoginRedirect"; // ✅ 新增的路由頁面
import DownloadPage from "./pages/DownloadPage"; // ✅ 下載頁面
import PhoneVerificationPage from "./pages/PhoneVerificationPage"; // ✅ 手機驗證頁面

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
        {/* 🏠 首頁邏輯（登入、儀表板） */}
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
        {/* ✅ Rich Menu 用快速登入頁 */}
        <Route path="/liff-login" element={<LiffLoginRedirect />} />
        {/* ✅ 下載頁面 */}
        <Route path="/download" element={<DownloadPage />} />
        {/* ✅ 手機驗證頁面 */}
        <Route path="/phone-verification" element={<PhoneVerificationPage />} />
        {/* ✅ 儀表板頁面 */}
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              profile={profile}
              onLogout={handleLogout}
              loading={loading}
              backendMessage={backendMessage}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
