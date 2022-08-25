import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { authentication } from "../functions/formValidation";
import { useDispatch } from "react-redux";
import { auth } from "../redux/account/userAction";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useTitle from "../hooks/useTitle";

import styles from "./accounts.module.css";

const ResetPassword = () => {
  useTitle("Reset Password");

  const success = useRef();
  const failed = useRef();

  const navigate = useNavigate();

  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
  }, [customToken, navigate]);

  useEffect(() => {
    setErrors(authentication(data, "RESET_PASSWORD"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const confirmResetPassword = (oobCode, password) => {
    return auth.confirmPasswordReset(oobCode, password);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      failed.current.textContent = "";
      success.current.textContent = "Password Updated! You Can Now Login With Your New Password.";
      dispatch(confirmResetPassword(query.get("oobCode"), data.password));
    } else {
      success.current.textContent = "";
      setTouched({ password: true, confirmPassword: true });
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form onSubmit={submitHandler}>
          <h2 className={styles.accountsTitle}>Reset Password</h2>
          <p className={styles.accountsHelp}>Enter New Password.</p>

          <div>
            <input className={styles.formControl} type="password" name="password" placeholder="New Password" value={data.password} onChange={changeHandler} onFocus={focusHandler} />
            <p className={styles.errors}>{errors.password && touched.password && errors.password}</p>
          </div>
          <div>
            <input
              className={styles.formControl}
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={data.confirmPassword}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <p className={styles.errors}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
          </div>

          <button className={styles.btn} type="submit">
            Reset Password
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

export default ResetPassword;
