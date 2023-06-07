import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <span className={styles.spanFooter}>
        © Copyright Social Brothers - 2023
      </span>
    </div>
  );
};

export default Footer;
