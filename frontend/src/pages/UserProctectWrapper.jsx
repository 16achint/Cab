import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProctectWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div>{children}</div>;
}

export default UserProctectWrapper;
