import React from "react";
import useTitle from "../hooks/useTitle";
import styles from "./Dashboard.module.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/account/userAction";

const Dashboard = () => {
  useTitle("Dashboard");

  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h2 className={styles.h1}>Welcome {isLoggedIn.displayName}!</h2>
        {!isLoggedIn.emailVerified ? (
          <p className={styles.notVerified}>
            {isLoggedIn.email} Is Not Verified At the Moment. To Use Our Services, You Need to Verify Your Email Address First. An Email Containing the Verification Link Has Been Sent to You When You
            Regestered. Please Check Your Inbox and Spam Folder for It. In Case of Any Problem, Contact: contact@mojtabamoradli.ir
          </p>
        ) : (
          <>
            <p className={styles.verified}>{isLoggedIn.email} is verified.</p>
          </>
        )}

        <button className={styles.btn} onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
