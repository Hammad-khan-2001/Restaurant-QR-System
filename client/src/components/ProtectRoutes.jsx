import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const ProtectRoutes = ({ children }) => {
  const { token, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>; // wait for async login
  if (!token) return <Navigate to="/login" />;

  return children;
};



export default ProtectRoutes;
