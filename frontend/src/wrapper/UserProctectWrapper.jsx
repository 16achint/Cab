import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
function UserProctectWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setuser] = useContext(userDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setuser(data.user);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token]);

  return <div>{children}</div>;
}

export default UserProctectWrapper;
