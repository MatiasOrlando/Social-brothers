import React from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({ className, text, handleClick }) => {
  return (
    <button type="submit" className={className} onClick={handleClick}>
      <span className={styles.buttonTextPost}>{text}</span>
    </button>
  );
};

export default CustomButton;
