import { useEffect, useState } from "react";
import liff from "@line/liff";
import { UserLogger } from "../utils/userLogger.js";

function LiffLoginRedirect() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;

        if (!liffId) {
          console.error("LIFF_ID 未設定，請檢查環境變數");
          return;
        }

        await liff.init({ liffId });

        if (!liff.isLoggedIn()) {
          console.log("🚫 用戶未登入，跳轉到 LINE 授權畫面");
          liff.login(); // 跳轉到 LINE 授權畫面
        } else {
          console.log("✅ 用戶已登入，開始檢查狀態");
          // 已登入，檢查用戶手機驗證狀態
          try {
            const userProfile = await liff.getProfile();
            
            // 顯示詳細的使用者資訊
            console.log("=== 使用者登入資訊 ===");
            console.log("用戶ID:", userProfile.userId);
            console.log("顯示名稱:", userProfile.displayName);
            console.log("頭像URL:", userProfile.pictureUrl);
            console.log("狀態訊息:", userProfile.statusMessage || '無');
            console.log("登入時間:", new Date().toLocaleString('zh-TW'));
            console.log("瀏覽器:", navigator.userAgent);
            console.log("語言:", navigator.language);
            console.log("平台:", navigator.platform);
            console.log("=========================");

            // 記錄使用者登入
            console.log("📝 開始記錄使用者登入...");
            UserLogger.logLogin(userProfile);
            console.log("✅ 使用者登入記錄完成");

            // 發送用戶資料到後端檢查是否為新用戶以及手機驗證狀態
            const response = await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userProfile.userId,
                displayName: userProfile.displayName,
              }),
            });

            const data = await response.json();
            console.log("🔗 後端回應:", data);
            console.log("📱 手機驗證狀態:", data.phoneVerified);

            // 檢查手機驗證狀態
            if (data.phoneVerified) {
              // 已驗證手機，跳轉到儀表板
              console.log("用戶已完成手機驗證，跳轉到儀表板");
              window.location.href = "/dashboard";
            } else {
              // 未驗證手機，跳轉到手機驗證頁面
              console.log("用戶尚未完成手機驗證，跳轉到手機驗證頁面");
              window.location.href = "/phone-verification";
            }
          } catch (error) {
            console.error("檢查用戶狀態失敗:", error);
            // 如果檢查失敗，預設跳轉到手機驗證頁面（安全考量）
            console.log("檢查失敗，預設跳轉到手機驗證頁面");
            window.location.href = "/phone-verification";
          }
        }
      } catch (error) {
        console.error("LIFF 初始化失敗:", error);
      }
    };

    initLiff();
  }, []);

  return (
    <div className="liff-login-redirect">
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "3px solid #1E90FF",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          ></div>
        </div>
        <p>檢查用戶狀態中，請稍候...</p>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          正在驗證您的登入狀態和手機驗證資訊
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LiffLoginRedirect;
