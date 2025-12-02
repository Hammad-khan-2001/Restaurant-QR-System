import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {

  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  console.log("ProtectRoutes token 👉", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoutes;
