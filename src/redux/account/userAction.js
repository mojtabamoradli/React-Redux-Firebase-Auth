import { auth } from "../../database/firebase";

const registerationSuccess = () => {
  return {
    type: "REGISTERATION_SUCCESS",
    // payload: user,
  };
};
const registerationFailure = (error) => {
  return {
    type: "REGISTERATION_FAILURE",
    payload: error,
  };
};
const verificationSuccess = (user) => {
  return {
    type: "EMAIL_VERIFICATION_SUCCESS",
    payload: user,
  };
};
const verificationFailure = (error) => {
  return {
    type: "EMAIL_VERIFICATION_FAILURE",
    payload: error,
  };
};
const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};
const loginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};
const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
const logoutFailure = (error) => {
  return {
    type: "LOGOUT_FAILURE",
    payload: error,
  };
};
const forgotPasswordSuccess = () => {
  return {
    type: "FORGOT_PASSWORD_SUCCESS",
  };
};
const forgotPasswordFailure = (error) => {
  return {
    type: "FORGOT_PASSWORD_FAILURE",
    payload: error,
  };
};
export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
export const logout = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then((response) => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFailure(error.message)));
  };
};

export { auth, registerationSuccess, registerationFailure, verificationSuccess, verificationFailure, loginSuccess, loginFailure, forgotPasswordSuccess, forgotPasswordFailure };
