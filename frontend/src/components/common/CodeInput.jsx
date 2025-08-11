import React, { useState, useRef, useEffect } from 'react';
import './CodeInput.css';

const CodeInput = ({ length = 6, value = '', onChange, onComplete, hasError = false }) => {
  const [codes, setCodes] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  // 初始化 refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // 同步外部 value
  useEffect(() => {
    if (value !== codes.join('')) {
      const newCodes = value.split('').slice(0, length);
      while (newCodes.length < length) {
        newCodes.push('');
      }
      setCodes(newCodes);
    }
  }, [value, length]);

  const handleChange = (index, inputValue) => {
    // 只允許數字
    const cleanValue = inputValue.replace(/[^0-9]/g, '');
    
    if (cleanValue.length > 1) {
      // 處理粘貼多位數字的情況
      const digits = cleanValue.split('').slice(0, length);
      const newCodes = [...codes];
      
      digits.forEach((digit, i) => {
        if (index + i < length) {
          newCodes[index + i] = digit;
        }
      });
      
      setCodes(newCodes);
      onChange(newCodes.join(''));
      
      // 檢查是否完成
      const filledCodes = newCodes.filter(code => code !== '');
      if (filledCodes.length === length) {
        onComplete && onComplete(newCodes.join(''));
      } else {
        // 移動焦點到下一個空的輸入框
        const nextEmptyIndex = newCodes.findIndex((code, i) => i > index && code === '');
        if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
          inputRefs.current[nextEmptyIndex].focus();
        }
      }
      
    } else {
      // 單個字符輸入
      const newCodes = [...codes];
      newCodes[index] = cleanValue;
      setCodes(newCodes);
      onChange(newCodes.join(''));
      
      // 自動移動到下一個輸入框
      if (cleanValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      
      // 檢查是否完成
      if (cleanValue && newCodes.filter(code => code !== '').length === length) {
        onComplete && onComplete(newCodes.join(''));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!codes[index] && index > 0) {
        // 如果當前框為空，移動到上一個框並清除
        inputRefs.current[index - 1]?.focus();
        const newCodes = [...codes];
        newCodes[index - 1] = '';
        setCodes(newCodes);
        onChange(newCodes.join(''));
      } else if (codes[index]) {
        // 清除當前框
        const newCodes = [...codes];
        newCodes[index] = '';
        setCodes(newCodes);
        onChange(newCodes.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain');
    const digits = pasteData.replace(/[^0-9]/g, '').split('').slice(0, length);
    
    const newCodes = new Array(length).fill('');
    digits.forEach((digit, i) => {
      newCodes[i] = digit;
    });
    
    setCodes(newCodes);
    onChange(newCodes.join(''));
    
    if (digits.length === length) {
      onComplete && onComplete(newCodes.join(''));
    }
    
    // 移動焦點到最後一個填充的輸入框
    const lastFilledIndex = Math.min(digits.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className={`code-input-container ${hasError ? 'error' : ''}`}>
      <div className="code-input-group">
        {codes.map((code, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={2} // 允許粘貼多位數
            value={code}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`code-input ${hasError ? 'error' : ''} ${code ? 'filled' : ''}`}
            autoComplete="off"
          />
        ))}
      </div>
    </div>
  );
};

export default CodeInput;