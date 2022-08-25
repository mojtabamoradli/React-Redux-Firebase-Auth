import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  const customToken = query.get("oobCode");
  const emailMode = query.get("mode");

  useEffect(() => {
    if (customToken == null) {
      navigate("/Login", { replace: true });
    } else if (emailMode == `verifyEmail`) {
      navigate(`/EmailVerification?mode=${query.get("mode")}&oobCode=${query.get("oobCode")}&apiKey=${query.get("apiKey")}&lang=${query.get("lang")}`, { replace: true });
    } else if (emailMode == `resetPassword`) {
      navigate(`/ResetPassword?mode=${query.get("mode")}&oobCode=${query.get("oobCode")}&apiKey=${query.get("apiKey")}&lang=${query.get("lang")}`, { replace: true });
    }
  }, [customToken, navigate, query]);

  return <div></div>;
};

export default Account;
