import React from "react";
import { useSelector } from "react-redux";
import MemberOnlyAction from "./MemberOnlyAction";

const MemberOnlyRedirect = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return isLoggedIn ? children : <MemberOnlyAction />;
};

export default MemberOnlyRedirect;
