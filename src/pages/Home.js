import React from "react";
import useTitle from "../hooks/useTitle";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styles from "./Home.module.css";
import RRF from "../assets/img/RRF.svg";
import Routes from "../assets/img/Routes.svg";

export default function Home() {
  useTitle("React, Redux, Firebase Authentication");

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.h1}>
          <span className={styles.react}>React</span>, <span className={styles.redux}>Redux</span>, <span className={styles.firebase}>Firebase Authentication</span>
        </h1>
        <img className={styles.image} title="RRF" alt="RRF" src={RRF} />

        <div className={styles.featuresContainer}>
          <div>
            <p>+ Member Only Page</p>
            <p>+ Verified Member Only Page</p>
            <p>+ Custom Email Verification Page</p>
            <p>+ Custom Reset Password Page</p>
            <p>+ Styled-Components / CSS</p>
          </div>

          <div className={styles.featuresContainer}>
            <div>
              <p>+ Custom Reset Password Template</p>
              <p>+ Functional Components / Hooks</p>
              <p>+ Protected Routes</p>
              <p>+ No JWT, No localStorage</p>
              <p>+ Code Related SEO</p>
            </div>
          </div>
        </div>
        <img className={styles.routes} title="Routes" alt="Routes" src={Routes} />
      </div>
      <Footer />
    </>
  );
}
