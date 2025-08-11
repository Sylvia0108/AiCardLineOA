import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import EnterPhoneNumber from '../components/phone/EnterPhoneNumber';
import EnterVerificationCode from '../components/phone/EnterVerificationCode';
import VerificationSuccess from '../components/phone/VerificationSuccess';

const PhoneVerificationPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: 輸入手機號碼, 2: 輸入驗證碼, 3: 驗證成功
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+886');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  
  const navigate = useNavigate();

  // 發送驗證碼
  const handleSendCode = async (phone, country) => {
    setIsLoading(true);
    setError('');
    
    try {
      // 模擬 API 調用 (快速測試)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setPhoneNumber(phone);
      setCountryCode(country);
      setCurrentStep(2);
      
      // 開始倒計時
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError('發送驗證碼失敗，請重試');
    } finally {
      setIsLoading(false);
    }
  };

  // 重新發送驗證碼
  const handleResendCode = async () => {
    await handleSendCode(phoneNumber, countryCode);
  };

  // 驗證驗證碼
  const handleVerifyCode = async (code) => {
    setIsLoading(true);
    setError('');
    
    try {
      // 模擬 API 調用 (快速測試)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 簡單驗證邏輯 (實際應該調用後端 API)
      if (code === '123456') {
        setVerificationCode(code);
        setCurrentStep(3);
      } else {
        throw new Error('驗證碼不正確');
      }
      
    } catch (err) {
      setError('驗證碼不正確');
    } finally {
      setIsLoading(false);
    }
  };

  // 完成驗證，前往首頁
  const handleComplete = () => {
    navigate('/dashboard');
  };

  // 返回上一步
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Header />
        
        {currentStep === 1 && (
          <EnterPhoneNumber
            onSendCode={handleSendCode}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        )}
        
        {currentStep === 2 && (
          <EnterVerificationCode
            phoneNumber={`${countryCode} ${phoneNumber}`}
            onVerifyCode={handleVerifyCode}
            onBack={handleBack}
            onResendCode={handleResendCode}
            isLoading={isLoading}
            error={error}
            resendTimer={resendTimer}
          />
        )}
        
        {currentStep === 3 && (
          <VerificationSuccess
            onComplete={handleComplete}
            onBack={handleBack}
          />
        )}
        
        <div className="bottom-spacer" />
      </div>
    </div>
  );
};

export default PhoneVerificationPage;