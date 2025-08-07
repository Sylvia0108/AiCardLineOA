import './LineLoginButton.css';

function LineLoginButton({ onClick, disabled }) {
  return (
    <button
      className="line-login-button"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="line-icon">LINE</span>
      使用 LINE 登入
    </button>
  );
}

export default LineLoginButton;