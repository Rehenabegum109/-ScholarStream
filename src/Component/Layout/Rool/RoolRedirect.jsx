import { useEffect } from "react";
import { useNavigate } from "react-router";

const RoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard"); 
  }, [navigate]);

  return <div>Redirecting to your dashboard...</div>;
};

export default RoleRedirect;
