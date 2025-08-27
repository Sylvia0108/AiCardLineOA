import React, { useState, useEffect } from "react";
import { UserLogger } from "../utils/userLogger.js";
import "./LogsPage.css";

function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const logData = UserLogger.getLogs();
    const statsData = UserLogger.getStats();
    setLogs(logData);
    setStats(statsData);
  };

  const handleDownload = () => {
    UserLogger.downloadLogs();
  };

  const handleClearLogs = () => {
    if (window.confirm("確定要清除所有登入記錄嗎？此操作無法復原。")) {
      UserLogger.clearLogs();
      loadLogs();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('zh-TW');
  };

  return (
    <div className="logs-page">
      <div className="logs-header">
        <h1>使用者登入記錄</h1>
        <div className="logs-actions">
          <button onClick={handleDownload} className="download-btn">
            下載記錄檔案
          </button>
          <button onClick={handleClearLogs} className="clear-btn">
            清除所有記錄
          </button>
        </div>
      </div>

      <div className="logs-stats">
        <div className="stat-item">
          <span className="stat-label">總登入次數:</span>
          <span className="stat-value">{stats.totalLogins}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">不重複用戶:</span>
          <span className="stat-value">{stats.uniqueUsers}</span>
        </div>
        {stats.lastLogin && (
          <div className="stat-item">
            <span className="stat-label">最後登入:</span>
            <span className="stat-value">{formatTime(stats.lastLogin.timestamp)}</span>
          </div>
        )}
      </div>

      <div className="logs-content">
        {logs.length === 0 ? (
          <div className="no-logs">
            <p>目前沒有登入記錄</p>
            <p>當有使用者登入時，記錄會自動顯示在這裡</p>
          </div>
        ) : (
          <div className="logs-list">
            {logs.map((log, index) => (
              <div key={index} className="log-item">
                <div className="log-header">
                  <span className="log-number">記錄 #{logs.length - index}</span>
                  <span className="log-time">{log.loginTime}</span>
                </div>
                <div className="log-details">
                  <div className="log-row">
                    <span className="log-label">用戶ID:</span>
                    <span className="log-value">{log.userId}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-label">顯示名稱:</span>
                    <span className="log-value">{log.displayName}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-label">狀態訊息:</span>
                    <span className="log-value">{log.statusMessage}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-label">瀏覽器:</span>
                    <span className="log-value">{log.userAgent}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-label">語言:</span>
                    <span className="log-value">{log.language}</span>
                  </div>
                  <div className="log-row">
                    <span className="log-label">平台:</span>
                    <span className="log-value">{log.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LogsPage;

