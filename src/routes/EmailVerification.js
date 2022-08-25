import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { auth, verificationSuccess, verificationFailure, logout } from "../redux/account/userAction";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useTitle from "../hooks/useTitle";

import styles from "./accounts.module.css";

const EmailVerification = () => {
  useTitle("Email Verification");

  const success = useRef();
  const failed = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  const customToken = query.get("oobCode");

  useEffect(() => {
    if (customToken == null) {
      navigate("/Login", { replace: true });
    }
  }, [customToken, navigate, query]);

  useEffect(() => {
    auth
      .applyActionCode(query.get("oobCode"), auth)
      .then((response) => {
        dispatch(verificationSuccess());
        success.current.textContent = "Account Activation Successful. You Can Now Login To Your Account and Use Our Services.";
        failed.current.textContent = "";
        dispatch(logout());
      })
      .catch((error) => {
        dispatch(verificationFailure(error.message));
        success.current.textContent = "";
        failed.current.textContent = `${error} Please Contanct: contact@mojtabamoradli.ir`;
      });
  }, [dispatch, query]);

  return (
    <>
      <Header />

      <div className={styles.emailVerification}>
        <h1 className={styles.failed} ref={failed}> </h1>
        <h1 className={styles.success} ref={success}> </h1>
      </div>

      <Footer />
    </>
  );
};

export default EmailVerification;
