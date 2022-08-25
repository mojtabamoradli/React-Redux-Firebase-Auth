import React from "react";
import icon from "../assets/img/icon.png";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.container}>
      <img title="LOGO" alt="Mojtaba Moradli" src={icon} />
      <p>Copyright &copy; <span>{new Date().getFullYear()}</span> <Link to="/">Mojtaba Moradli</Link>. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
