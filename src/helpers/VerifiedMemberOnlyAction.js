import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifiedMemberOnlyAction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/Dashboard", { replace: true });
  }, [navigate]);

  return;
};

export default VerifiedMemberOnlyAction;
