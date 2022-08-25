import React from "react";

import useTitle from "../hooks/useTitle";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import styles from "./Terms&Conditions.module.css";

const TermsConditions = () => {
  useTitle("Terms & Conditions");

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Terms & Conditions</h1>

        <div className={styles.terms}>
          <ul>
            <li><p>This is a sample project. The codes and related resources can be used by other developers.</p></li>
            <li><p>We do not collect cookies.</p></li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsConditions;
