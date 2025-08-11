import React, { useState, useEffect } from 'react';
import './VerificationSuccess.css';

const VerificationSuccess = ({ onComplete, onBack }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleCompleteNow = () => {
    onComplete();
  };

  return (
    <div className="verification-success-card">
      <button 
        type="button" 
        onClick={onBack}
        className="back-button"
        aria-label="返回"
      >
        ←
      </button>

      <div className="success-icon">
        <div className="success-checkmark">
          ✓
        </div>
      </div>

      <h2 className="success-title">驗證成功</h2>
      <p className="success-description">
        您的手機號碼已成功驗證
      </p>

      <button
        type="button"
        onClick={handleCompleteNow}
        className="complete-button"
      >
        前往 AiCard 首頁
      </button>

      <div className="countdown-text">
        {countdown}秒後系統將自動導入首頁
      </div>
    </div>
  );
};

export default VerificationSuccess;