import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


import { authentication } from "../functions/formValidation";
import { useSelector, useDispatch } from "react-redux";
import { auth, registerationSuccess, registerationFailure, logout } from "../redux/account/userAction";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useTitle from "../hooks/useTitle";

import styles from "./accounts.module.css";

const Register = () => {
  useTitle("Register");

  const success = useRef();
  const failed = useRef();

  const navigate = useNavigate();

  const { userExist, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (userExist && isLoggedIn) {
      navigate("/Dashboard", { replace: true });
    }
  }, [userExist, navigate]);

  useEffect(() => {
    setErrors(authentication(data, "REGISTER"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const registration = (fullName, email, password) => {
    return (dispatch) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          user.sendEmailVerification();
          user.updateProfile({
            displayName: fullName,
          });
          dispatch(registerationSuccess());
          failed.current.textContent = "";
          success.current.textContent = "Registration Successful. Please Check Your Email to Verify Your Account.";
          dispatch(logout());
        })
        .catch((error) => {
          dispatch(registerationFailure(error.message));
          error = error.message;
          success.current.textContent = "";
          failed.current.textContent = `${error}`;
        });
    };
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(registration(data.fullName, data.email, data.password));
    } else {
      setTouched({ fullName: true, email: true, password: true, confirmPassword: true });
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form onSubmit={submitHandler}>
          <h2 className={styles.accountsTitle}>Register</h2>
          <p className={styles.accountsHelp}>Please Fill the Form.</p>

          <div>
            <input className={styles.formControl} type="text" name="fullName" placeholder="Full Name" value={data.fullName} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.fullName && touched.fullName && errors.fullName}</p>
          </div>
          <div>
            <input className={styles.formControl} type="email" name="email" placeholder="Email" value={data.email} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.email && touched.email && errors.email}</p>
          </div>
          <div>
            <input className={styles.formControl} type="password" name="password" placeholder="Password" value={data.password} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.password && touched.password && errors.password}</p>
          </div>
          <div>
            <input className={styles.formControl} type="password" name="confirmPassword" placeholder="Confirm Password" value={data.confirmPassword} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
          </div>

          <button className={styles.btn} type="submit">
            Register
          </button>

          <div className={styles.result}>
            <span className={styles.failed} ref={failed}></span>
            <span className={styles.success} ref={success}></span>
          </div>

          <div className={styles.accountsTerms}>
            <span>By Creating an Account You Agree to Our </span>
            <Link className={styles.a} to="/Terms&Conditions">Terms & Conditions</Link>
            <span>.</span>
          </div>

          <div className={styles.accounts}>
            <span>Already Have an Account? </span>
            <Link className={styles.a} to="/Login">Login</Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
