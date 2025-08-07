import './UserIconPrompt.css';

function UserIconPrompt() {
  return (
    <div className="user-icon-container">
      <div className="user-icon">
        <svg width="100" height="100" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="30" fill="#C8DCFD" />
          <circle cx="30" cy="24" r="6" fill="white" />
          <path d="M16 46c0-8 6-14 14-14s14 6 14 14" fill="white" />
        </svg>
      </div>
      <p className="login-instruction">
        請使用 LINE 帳號登入
      </p>
    </div>
  );
}

export default UserIconPrompt;