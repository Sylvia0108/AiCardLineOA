import './TermsCheckbox.css';

function TermsCheckbox({ agreedToTerms, setAgreedToTerms }) {
  return (
    <div className="terms-container">
      <label className="terms-checkbox">
        <div 
          className={`custom-checkbox ${agreedToTerms ? 'checked' : ''}`}
          onClick={() => setAgreedToTerms(!agreedToTerms)}
        >
          {agreedToTerms && <span className="checkmark">✓</span>}
        </div>
        <span className="terms-text">
          我已閱讀並同意
          <a href="#" className="terms-link">
            服務條款
          </a>{" "}
          和
          <a href="#" className="terms-link">
            隱私政策
          </a>
        </span>
      </label>
    </div>
  );
}

export default TermsCheckbox;