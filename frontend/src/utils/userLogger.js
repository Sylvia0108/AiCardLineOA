// 使用者登入記錄工具
export class UserLogger {
  // 記錄使用者登入
  static logLogin(profile) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      loginTime: new Date().toLocaleString('zh-TW'),
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage || '無',
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform
    };

    // 儲存到 localStorage
    this.saveToStorage(logEntry);
    
    console.log('✅ 使用者登入記錄已儲存:', logEntry);
  }

  // 儲存到 localStorage
  static saveToStorage(logEntry) {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('userLogs') || '[]');
      existingLogs.push(logEntry);
      localStorage.setItem('userLogs', JSON.stringify(existingLogs));
    } catch (error) {
      console.error('❌ 儲存登入記錄失敗:', error);
    }
  }

  // 獲取所有記錄
  static getLogs() {
    try {
      return JSON.parse(localStorage.getItem('userLogs') || '[]');
    } catch (error) {
      console.error('❌ 讀取登入記錄失敗:', error);
      return [];
    }
  }

  // 清除所有記錄
  static clearLogs() {
    try {
      localStorage.removeItem('userLogs');
      console.log('✅ 登入記錄已清除');
    } catch (error) {
      console.error('❌ 清除登入記錄失敗:', error);
    }
  }

  // 下載記錄檔案
  static downloadLogs() {
    try {
      const logs = this.getLogs();
      if (logs.length === 0) {
        alert('目前沒有登入記錄');
        return;
      }

      // 格式化記錄為易讀的文字
      const logText = logs.map((log, index) => `
=== 登入記錄 ${index + 1} ===
登入時間: ${log.loginTime}
用戶ID: ${log.userId}
顯示名稱: ${log.displayName}
狀態訊息: ${log.statusMessage}
瀏覽器: ${log.userAgent}
語言: ${log.language}
平台: ${log.platform}
----------------------------------------
`).join('\n');

      // 建立並下載檔案
      const blob = new Blob([logText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-logins-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      console.log('✅ 登入記錄檔案已下載');
    } catch (error) {
      console.error('❌ 下載記錄檔案失敗:', error);
      alert('下載記錄檔案失敗');
    }
  }

  // 獲取記錄統計
  static getStats() {
    const logs = this.getLogs();
    return {
      totalLogins: logs.length,
      uniqueUsers: new Set(logs.map(log => log.userId)).size,
      lastLogin: logs.length > 0 ? logs[logs.length - 1] : null
    };
  }
}

