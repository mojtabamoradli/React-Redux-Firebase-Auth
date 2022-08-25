import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useTitle from "../hooks/useTitle";

import { authentication } from "../functions/formValidation";
import { useSelector, useDispatch } from "react-redux";
import { auth, loginSuccess, loginFailure } from "../redux/account/userAction";

import styles from "./accounts.module.css";

const Login = () => {
  useTitle("Login");

  const success = useRef();
  const failed = useRef();

  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setErrors(authentication(data, "LOGIN"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const login = (email, password) => {
    return (dispatch) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          dispatch(loginSuccess(user));
          success.current.textContent = "Login Successful.";
          failed.current.textContent = "";
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
          error = error.message;
          success.current.textContent = "";
          failed.current.textContent = `${error}`;
        });
    };
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(login(data.email, data.password));
    } else {
      setTouched({ email: true, password: true });
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={submitHandler}>
          <h2 className={styles.accountsTitle}>Login</h2>
          <p className={styles.accountsHelp}>Please Enter Your Email and Password.</p>

          <div>
            <input className={styles.formControl} type="email" name="email" placeholder="Email" value={data.email} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.email && touched.email && errors.email}</p>
          </div>
          <div>
            <input className={styles.formControl} type="password" name="password" placeholder="Password" value={data.password} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.password && touched.password && errors.password}</p>
          </div>

          <button className={styles.btn} type="submit">
            Login
          </button>

          <div className={styles.result}>
            <span className={styles.failed} ref={failed}></span>
            <span className={styles.success} ref={success}></span>
          </div>

          <div>
            <Link className={styles.a} to="/ForgotPassword">
              Forgot Password
            </Link>
          </div>
          <div className={styles.accounts}>
            <span>Don't Have an Account? </span>
            <Link className={styles.a} to="/Register">
              Register
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Login;
