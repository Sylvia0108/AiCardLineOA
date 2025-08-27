import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import { LiffContext } from "./LiffContext.js";

export const LiffProvider = ({ children }) => {
  const [isLiffReady, setIsLiffReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [initAttempted, setInitAttempted] = useState(false);

  useEffect(() => {
    // 避免重複初始化
    if (initAttempted) return;

    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;
        console.log("🔍 環境變數檢查:");
        console.log("- VITE_LIFF_ID:", liffId);
        console.log("- typeof:", typeof liffId);
        console.log("- length:", liffId ? liffId.length : "undefined");

        if (!liffId || liffId.trim() === "") {
          throw new Error("LIFF_ID 未設定或為空，請檢查環境變數 VITE_LIFF_ID");
        }

        console.log("🚀 開始初始化 LIFF...");
        await liff.init({ liffId: liffId.trim() });

        setIsLiffReady(true);
        console.log("✅ LIFF 初始化成功");

        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
          const profile = await liff.getProfile();
          setUserProfile(profile);
          console.log("👤 用戶已登入:", profile.displayName);

          // 只在主頁面時檢查手機驗證狀態
          const currentPath = window.location.pathname;
          console.log("📍 當前路徑:", currentPath);
          if (currentPath === "/") {
            console.log("🔄 檢查手機驗證狀態...");
            await checkPhoneVerificationStatus(profile);
          }
        } else {
          console.log("🚫 用戶未登入");
          setIsLoggedIn(false);
          setPhoneVerified(false);
        }
      } catch (err) {
        const errorMsg = `LIFF 初始化失敗: ${err.message}`;
        console.error("❌", errorMsg);
        console.error("錯誤詳情:", err);
        setError(errorMsg);

        // 即使失敗也要設置這些狀態，避免無限重試
        setIsLiffReady(false);
        setIsLoggedIn(false);
        setPhoneVerified(false);
      } finally {
        setLoading(false);
        setInitAttempted(true);
        console.log("🏁 LIFF 初始化流程完成");
      }
    };

    initLiff();
  }, [initAttempted]);

  const checkPhoneVerificationStatus = async (profile) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: profile.userId,
          displayName: profile.displayName,
        }),
      });

      const data = await response.json();
      setPhoneVerified(data.phoneVerified);
      console.log("手機驗證狀態:", data.phoneVerified);
    } catch (err) {
      console.error("檢查手機驗證狀態失敗:", err);
      setPhoneVerified(false);
    }
  };

  const login = () => {
    if (isLiffReady && !liff.isLoggedIn()) {
      liff.login();
    }
  };

  const logout = () => {
    if (isLiffReady && liff.isLoggedIn()) {
      liff.logout();
    }
  };

  const value = {
    isLiffReady,
    isLoggedIn,
    userProfile,
    phoneVerified,
    loading,
    error,
    login,
    logout,
    setPhoneVerified,
    checkPhoneVerificationStatus,
  };

  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>;
};
