import Header from "../components/layout/Header";
import LoginCard from "../components/login/LoginCard";

function LoginPage({ onLogin, error, agreedToTerms, setAgreedToTerms }) {
  return (
    <div className="login-page">
      <Header />
      
      <div className="login-container">
        <LoginCard 
          onLogin={onLogin}
          error={error}
          agreedToTerms={agreedToTerms}
          setAgreedToTerms={setAgreedToTerms}
        />
      </div>
    </div>
  );
}

export default LoginPage;