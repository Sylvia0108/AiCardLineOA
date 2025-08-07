import './LoginCard.css';
import UserIconPrompt from "./UserIconPrompt";
import TermsCheckbox from "./TermsCheckbox";
import ErrorMessage from "../common/ErrorMessage";
import LineLoginButton from "../common/LineLoginButton";

function LoginCard({ onLogin, error, agreedToTerms, setAgreedToTerms }) {
  return (
    <div className="login-card">
      <h2 className="welcome-text">歡迎使用</h2>
      
      <UserIconPrompt />
      
      <TermsCheckbox 
        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}
      />

      <ErrorMessage error={error} />

      <LineLoginButton 
        onClick={onLogin}
        disabled={!agreedToTerms}
      />
    </div>
  );
}

export default LoginCard;