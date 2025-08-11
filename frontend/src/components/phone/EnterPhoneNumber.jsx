import React, { useState } from "react";
import "./EnterPhoneNumber.css";

const EnterPhoneNumber = ({
  onSendCode,
  onBack,
  isLoading = false,
  error = "",
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode] = useState("+886"); // 移除 setCountryCode，因為目前不支援動態切換國家

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      return;
    }

    // 移除手機號碼中的空格和特殊字符，只保留數字
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanPhoneNumber.length < 8) {
      return;
    }

    // 直接調用發送驗證碼，不顯示成功訊息
    onSendCode(cleanPhoneNumber, countryCode);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // 只允許數字、空格、連字符
    const cleanValue = value.replace(/[^\d\s-]/g, "");
    setPhoneNumber(cleanValue);
  };

  const isValid = phoneNumber.replace(/\D/g, "").length >= 8;

  return (
    <div className="phone-verification-card">
      <button
        type="button"
        onClick={onBack}
        className="back-button"
        aria-label="返回"
      >
        ←
      </button>

      <div className="icon-stack">
        <div className="icon-background"></div>
        <div className="icon-foreground">
          <svg
            className="phone-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v14H7V4zm5 15c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>
      </div>

      <h2 className="verification-title">手機號碼驗證</h2>
      <p className="verification-instructions">
        請輸入您的手機號碼以接收驗證碼
      </p>

      <form onSubmit={handleSubmit} className="verification-form">
        <div className="form-group">
          <label htmlFor="phone-number" className="form-label">
            手機號碼
          </label>
          <div className="phone-input-container">
            <div className="country-selector">
              <span className="country-flag" aria-hidden="true">
                🇹🇼
              </span>
              <span className="country-code">{countryCode}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="請輸入您的手機號碼"
              className="phone-input"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className={`submit-button ${!isValid || isLoading ? "disabled" : ""}`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? "發送中..." : "發送驗證碼"}
        </button>
      </form>
    </div>
  );
};

export default EnterPhoneNumber;
