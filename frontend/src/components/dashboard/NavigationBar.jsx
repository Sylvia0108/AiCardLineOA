import React from 'react';
import './NavigationBar.css';

const NavigationBar = ({ title = "我的電子名片", onBack, onSettings }) => {
  return (
    <div className="bg-header-gradient flex-shrink-0">
      <div className="flex justify-center items-center w-full px-4 py-6">
        {/* 中央標題 */}
        <div className="flex justify-center items-center">
          <h1 className="nav-title font-roboto font-bold text-xl leading-[1.4em] text-white m-0 text-center whitespace-nowrap">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
