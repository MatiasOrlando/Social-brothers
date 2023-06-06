import React, { useState, useEffect } from "react";
import header from "../../assets/header.png";
import logo from "../../assets/logo.svg";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveSection("Home");
    } else if (location.pathname === "/blog") {
      setActiveSection("Blog");
    }
  }, [location.pathname]);

  return (
    <nav className={styles.container}>
      <img src={header} className={styles.mask} />
      <img src={logo} alt={logo} className={styles.logo} />
      <div className={styles.stackedGroup}>
        <NavLink
          to="/"
          className={activeSection === "Home" ? styles.activeSection : ""}
        >
          Home
        </NavLink>
        <NavLink
          to="/blog"
          className={activeSection === "Blog" ? styles.activeSection : ""}
        >
          Blog
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
