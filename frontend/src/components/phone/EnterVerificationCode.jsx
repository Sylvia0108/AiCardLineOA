import React, { useState } from 'react';
import CodeInput from '../common/CodeInput';
import './EnterVerificationCode.css';

const EnterVerificationCode = ({ 
  phoneNumber, 
  onVerifyCode, 
  onBack, 
  onResendCode, 
  isLoading = false, 
  error = '', 
  resendTimer = 0 
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  
  const handleCodeChange = (code) => {
    setVerificationCode(code);
  };

  const handleCodeComplete = (code) => {
    setVerificationCode(code);
    // 自動驗證
    setTimeout(() => {
      onVerifyCode(code);
    }, 300);
  };

  // 當有錯誤時自動清除驗證碼
  React.useEffect(() => {
    if (error && verificationCode.length === 6) {
      // 延遲清除，讓用戶看到錯誤狀態
      setTimeout(() => {
        setVerificationCode('');
        // 清除後立即重置焦點到第一個輸入框，確保位置和第一次一樣
        setTimeout(() => {
          const firstInput = document.querySelector('.code-input');
          if (firstInput) {
            // 先 blur 再 focus，確保完全重置
            firstInput.blur();
            setTimeout(() => {
              firstInput.focus();
              // 強制重新渲染輸入框樣式，確保和第一次一樣
              firstInput.style.color = '#1f2937';
              firstInput.style.webkitTextFillColor = '#1f2937';
              firstInput.style.webkitTextSecurity = 'none';
              firstInput.style.textSecurity = 'none';
              firstInput.style.textAlign = 'center';
              firstInput.style.lineHeight = 'normal';
            }, 10);
          }
        }, 50);
      }, 1000);
    }
  }, [error, verificationCode.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.length === 6) {
      onVerifyCode(verificationCode);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0 && !isLoading) {
      setVerificationCode(''); // 清除現有驗證碼
      onResendCode();
    }
  };

  const isValid = verificationCode.length === 6;
  const hasError = error && error.length > 0;

  return (
    <div className="verification-card">
      <header className="card-header">
        <button 
          type="button" 
          onClick={onBack}
          className="icon-button"
          aria-label="返回"
        >
          <span className="back-icon">←</span>
        </button>
      </header>

      <main className="card-content">
        <div className="icon-group">
          <div className="icon-bg">
            <svg className="shield-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        <h1 className="title">輸入驗證碼</h1>
        <p className="subtitle">驗證碼已發送至 {phoneNumber}</p>

        <form onSubmit={handleSubmit} className="otp-form">
          <label className="form-label">6位數驗證碼</label>
          
          <CodeInput
            length={6}
            value={verificationCode}
            onChange={handleCodeChange}
            onComplete={handleCodeComplete}
            hasError={hasError}
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </form>
      </main>

      <footer className="card-actions">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`btn btn-primary ${!isValid || isLoading ? 'disabled' : ''}`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? '驗證中...' : '驗證'}
        </button>

        <button
          type="button"
          onClick={handleResend}
          className={`btn btn-secondary ${resendTimer > 0 || isLoading ? 'disabled' : ''}`}
          disabled={resendTimer > 0 || isLoading}
        >
          {resendTimer > 0 ? `重新發送驗證碼 (${resendTimer})` : '重新發送驗證碼'}
        </button>
      </footer>
    </div>
  );
};

export default EnterVerificationCode;