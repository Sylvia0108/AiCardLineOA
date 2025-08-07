import './LogoutButton.css';

function LogoutButton({ onClick, disabled, loading }) {
  return (
    <button
      className="logout-button"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? "登出中..." : "登出"}
    </button>
  );
}

export default LogoutButton;