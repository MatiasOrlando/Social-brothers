import React, { useState, useEffect } from "react";
import banner from "../../assets/banner.png";
import logo from "../../assets/logo.svg";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("Home");
    } else if (pathname === "/blog") {
      setActiveSection("Blog");
    }
  }, [pathname]);

  return (
    <nav className={styles.container}>
      <img src={banner} className={styles.mask} />
      <img src={logo} alt={logo} className={styles.logo} />
      {pathname === "/blog" && (
        <div className={styles.blogNavbar}>
          <h1>Blog</h1>
        </div>
      )}
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
          style={{ width: "39px" }}
        >
          Blog
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
