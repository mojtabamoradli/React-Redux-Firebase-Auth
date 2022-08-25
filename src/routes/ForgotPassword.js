import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth, forgotPasswordSuccess, forgotPasswordFailure } from "../redux/account/userAction";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useTitle from "../hooks/useTitle";
import { authentication } from "../functions/formValidation";

import styles from "./accounts.module.css";

const ForgotPassword = () => {
  useTitle("Forgot Password");

  const navigate = useNavigate();

  const success = useRef();
  const failed = useRef();

  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setErrors(authentication(data, "FORGOT_PASSWORD"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const forgotPassword = (email) => {
    return (dispatch) => {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch(forgotPasswordSuccess());
          failed.current.textContent = "";
          success.current.textContent = "Please Check Your Email to Recover Your Account.";
        })
        .catch((error) => {
          dispatch(forgotPasswordFailure(error.message));
          error = error.message;
          success.current.textContent = "";
          failed.current.textContent = `${error}`;
        });
    };
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(forgotPassword(data.email));
    } else {
      setTouched({ email: true });
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form onSubmit={submitHandler}>
          <h2 className={styles.accountsTitle}>Forgot Password</h2>
          <p className={styles.accountsHelp}>Enter your email.</p>

          <div>
            <input className={styles.formControl} type="email" name="email" placeholder="Email" value={data.email} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.email && touched.email && errors.email}</p>
          </div>

          <button className={styles.btn} type="submit">
            Recover Account
          </button>
          <div className={styles.result}>
            <span className={styles.failed} ref={failed}></span>
            <span className={styles.success} ref={success}></span>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPassword;
