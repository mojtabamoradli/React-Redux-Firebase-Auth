import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { auth } from "./database/firebase";

import { setUser } from "./redux/account/userAction";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TermsConditions from "./pages/Terms&Conditions";

import Login from "./routes/Login";
import Register from "./routes/Register";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";
import Dashboard from "./routes/Dashboard";
import EmailVerification from "./routes/EmailVerification";
import ForOnlyVerifiedMemebers from "./routes/ForOnlyVerifiedMemebers";

// Basically we have three kinds of pages and routes. 1. Public (Everybody Can See)
//                                                                                       2. Member only (Those who are not logged in cannot see)
//                                                                                       2. Verified Member only (Only those who are logged in and their email address is been verified can see)
//  These three cases impelimented using states, useEffect; No JWT, No localStorage. How?
// Firebase Authentication gives the state of email verification for each user that can be used and coded conditionally.

import MemberOnlyRedirect from "./helpers/MemberOnlyRedirect";
import VerifiedMemberOnlyRedirect from "./helpers/VerifiedMemberOnlyRedirect";

// Firebase Authentication lets you to send email through Firebase Console to users and let them to verify their emails and reset their password using action links.
//  Meaning that these action links navigate users to Firebase Origianl pages for notifying their email verification status and resetting their password.
// If you want users to navigate to custom notifying email verification status and reset password pages, you have to send them two different links; but Firebase only let you to enter one custom link.
// To solve this problem, I created one route, Account route, that takes the MODE of the email sent by Firebase; if it is verifyEmail, it navigate user to custom EmailVerification route and if it is resetPassword, it navigate user to custom ResetPassword route.

import Account from "./helpers/Account";

// Note: There is a templates folder in src that contain two .html files. These files are email verification and reset password emails templates.
//            Firebase only let you to customize reset password email template. So, one of these files are not going to be used in this project.

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/Dashboard" element={<MemberOnlyRedirect><Dashboard /></MemberOnlyRedirect>}/>
      <Route path="/ForOnlyVerifiedMemebers" element={<VerifiedMemberOnlyRedirect><ForOnlyVerifiedMemebers /></VerifiedMemberOnlyRedirect>}/>
      <Route path="/EmailVerification" element={<EmailVerification />} />
      <Route path="/NotFound" element={<NotFound />} />
      <Route path="/Terms&Conditions" element={<TermsConditions />} />
      <Route path="/*" element={<Navigate to="/NotFound" />} />
    </Routes>
  );
};

export default App;
