import React from "react";
import { useSelector } from "react-redux";
import VerifiedMemberOnlyAction from "./VerifiedMemberOnlyAction";

const VerifiedMemberOnlyRedirect = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return isLoggedIn && isLoggedIn.emailVerified ? children : <VerifiedMemberOnlyAction />;
};

export default VerifiedMemberOnlyRedirect;
