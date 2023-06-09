import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <p className={styles.footerText}>
        © {new Date().getFullYear()} Social Brothers
      </p>
    </footer>
  );
};

export default Footer;
