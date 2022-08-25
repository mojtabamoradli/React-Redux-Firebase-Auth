import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberOnlyAction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/Login", { replace: true });
  }, [navigate]);

  return;
};

export default MemberOnlyAction;
