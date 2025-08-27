import React from 'react';
import plusIcon from "../../assets/figma/plus-icon.svg";
import './AddCardButton.css';

const AddCardButton = ({ onClick, text = "新增名片", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`add-card-button ${className}`}
    >
      <img
        src={plusIcon}
        alt="Add"
      />
      <span>
        {text}
      </span>
    </button>
  );
};

export default AddCardButton;
