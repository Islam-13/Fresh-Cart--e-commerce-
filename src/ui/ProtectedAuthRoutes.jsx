import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedAuthRoutes({ children }) {
  const { isLoggedIn } = useAuthContext();
  return <div>{!isLoggedIn ? children : <Navigate to={"/"} />}</div>;
}

export default ProtectedAuthRoutes;
