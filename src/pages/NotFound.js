import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styles from "./NotFound.module.css";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("404");

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <h1>Page Not Found</h1>
        <h2> Error 404</h2>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
