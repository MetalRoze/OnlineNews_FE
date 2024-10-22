import React from "react";

const TextButton = ({ label, isActive, onClick, style }) => {
  return (
    <span 
      className={`textButton ${isActive ? "active" : ""}`} 
      onClick={onClick}
      style={style}
    >
      {label}
    </span>
  );
};

export default TextButton;
