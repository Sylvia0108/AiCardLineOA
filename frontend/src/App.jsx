import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import liff from "@line/liff";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DownloadPage from "./pages/DownloadPage";
import PhoneVerificationPage from "./pages/PhoneVerificationPage";
import LiffLoginRedirect from "./pages/LiffLoginRedirect";
import { useLiff } from "./context/useLiff";

function App() {
  const {
    isLoggedIn,
    userProfile,
    phoneVerified,
    loading,
    error: liffError,
    logout,
  } = useLiff();

  const [backendMessage, setBackendMessage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  // 合併錯誤訊息
  const displayError = error || liffError;

  // 處理根據手機驗證狀態的重導向
  useEffect(() => {
    // 只有在沒有錯誤且LIFF準備好的情況下才處理重導向
    if (liffError || !isLoggedIn) return;

    if (phoneVerified === false) {
      // 檢查當前路由，避免在已經在手機驗證頁面時重複重導向
      const currentPath = window.location.pathname;
      if (currentPath !== "/phone-verification") {
        console.log("用戶未驗證手機，重導向到手機驗證頁面");
        window.location.href = "/phone-verification";
      }
    }
  }, [isLoggedIn, phoneVerified, liffError]);

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
      setBackendMessage("");
      setError("");

      logout(); // 使用 LiffContext 的 logout

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

  return (
    <Router>
      <Routes>
        {/* 🏠 首頁邏輯（登入、儀表板） */}
        <Route
          path="/"
          element={
            loading ? (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <div>LIFF 載入中...</div>
              </div>
            ) : displayError ? (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <div className="error" style={{ marginBottom: "20px" }}>
                  錯誤: {displayError}
                </div>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1E90FF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  重新載入頁面
                </button>
              </div>
            ) : !isLoggedIn ? (
              <LoginPage
                onLogin={handleLogin}
                error={error}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={setAgreedToTerms}
              />
            ) : phoneVerified === null ? (
              <div>檢查用戶狀態中...</div>
            ) : phoneVerified === false ? (
              // 用戶已登入但未驗證手機，重導向到手機驗證頁面
              <div>重導向到手機驗證頁面...</div>
            ) : (
              // 用戶已登入且已驗證手機，顯示儀表板
              <DashboardPage
                profile={userProfile}
                onLogout={handleLogout}
                loading={loading}
                backendMessage={backendMessage}
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
              profile={userProfile}
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
