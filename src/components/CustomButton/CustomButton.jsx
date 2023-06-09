import React from "react";

const CustomButton = ({ className, text, handleClick }) => {
  return (
    <button type="submit" className={className} onClick={handleClick}>
      <span className="buttonTextPost">{text}</span>
    </button>
  );
};

export default CustomButton;
