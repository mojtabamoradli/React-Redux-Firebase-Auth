import React from "react";

import useTitle from "../hooks/useTitle";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import styles from "./ForOnlyVerifiedMembers.module.css";

const ForOnlyVerifiedMemebers = () => {
  useTitle("ForOnlyVerifiedMembers");

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Only Verified Memebers Can See This Page</h2>
      </div>
      <Footer />
    </>
  );
};

export default ForOnlyVerifiedMemebers;
