import { useEffect } from "react";
import liff from "@line/liff";

function LiffLoginRedirect() {
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
          liff.login(); // 跳轉到 LINE 授權畫面
        } else {
          // 已登入，跳轉到手機驗證頁面
          window.location.href = "/phone-verification";
        }
      } catch (error) {
        console.error("LIFF 初始化失敗:", error);
      }
    };

    initLiff();
  }, []);

  return (
    <div className="liff-login-redirect">
      <p>登入中，請稍候...</p>
    </div>
  );
}

export default LiffLoginRedirect;